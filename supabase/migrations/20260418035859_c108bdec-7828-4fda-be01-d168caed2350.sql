
-- 1. Add columns to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS tier text CHECK (tier IN ('junior', 'explorer')),
  ADD COLUMN IF NOT EXISTS total_xp integer NOT NULL DEFAULT 0;

-- 2. Activities catalog
CREATE TABLE IF NOT EXISTS public.activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  xp_value integer NOT NULL,
  tier text NOT NULL CHECK (tier IN ('both', 'explorer')),
  category text,
  order_index integer
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view activities"
ON public.activities FOR SELECT TO authenticated USING (true);

-- 3. Student activities log
CREATE TABLE IF NOT EXISTS public.student_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  country_id text NOT NULL,
  activity_id uuid NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  completed_at timestamptz NOT NULL DEFAULT now(),
  xp_earned integer NOT NULL,
  notes text
);

CREATE INDEX IF NOT EXISTS idx_student_activities_student ON public.student_activities(student_id);
CREATE INDEX IF NOT EXISTS idx_student_activities_country ON public.student_activities(student_id, country_id);

ALTER TABLE public.student_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own activities"
ON public.student_activities FOR SELECT TO authenticated
USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own activities"
ON public.student_activities FOR INSERT TO authenticated
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Teachers can view class student activities"
ON public.student_activities FOR SELECT TO authenticated
USING (
  has_role(auth.uid(), 'teacher'::app_role)
  AND get_class_code(auth.uid()) IS NOT NULL
  AND get_class_code(student_id) = get_class_code(auth.uid())
);

-- 4. XP ledger
CREATE TABLE IF NOT EXISTS public.xp_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  country_id text,
  activity_id uuid REFERENCES public.activities(id) ON DELETE SET NULL,
  xp_amount integer NOT NULL,
  reason text,
  earned_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_xp_ledger_student ON public.xp_ledger(student_id);

ALTER TABLE public.xp_ledger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own xp ledger"
ON public.xp_ledger FOR SELECT TO authenticated
USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view class xp ledger"
ON public.xp_ledger FOR SELECT TO authenticated
USING (
  has_role(auth.uid(), 'teacher'::app_role)
  AND get_class_code(auth.uid()) IS NOT NULL
  AND get_class_code(student_id) = get_class_code(auth.uid())
);

CREATE POLICY "No client inserts on xp ledger"
ON public.xp_ledger FOR INSERT TO authenticated WITH CHECK (false);

CREATE POLICY "No client updates on xp ledger"
ON public.xp_ledger FOR UPDATE TO authenticated USING (false);

CREATE POLICY "No client deletes on xp ledger"
ON public.xp_ledger FOR DELETE TO authenticated USING (false);

-- 5. Journal prompts
CREATE TABLE IF NOT EXISTS public.journal_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_text text NOT NULL,
  tier text NOT NULL DEFAULT 'both' CHECK (tier IN ('both', 'explorer'))
);

ALTER TABLE public.journal_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view journal prompts"
ON public.journal_prompts FOR SELECT TO authenticated USING (true);

-- 6. Update explorations
ALTER TABLE public.explorations
  ADD COLUMN IF NOT EXISTS total_xp_earned integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tier text;

-- 7. Trigger: when student_activities inserted, write to xp_ledger and bump profile total_xp + exploration total_xp_earned
CREATE OR REPLACE FUNCTION public.handle_student_activity_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.xp_ledger (student_id, country_id, activity_id, xp_amount, reason)
  VALUES (NEW.student_id, NEW.country_id, NEW.activity_id, NEW.xp_earned, 'activity_completed');

  UPDATE public.profiles
  SET total_xp = total_xp + NEW.xp_earned
  WHERE id = NEW.student_id;

  UPDATE public.explorations
  SET total_xp_earned = total_xp_earned + NEW.xp_earned
  WHERE student_id = NEW.student_id AND country_id = NEW.country_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_student_activity_insert ON public.student_activities;
CREATE TRIGGER on_student_activity_insert
AFTER INSERT ON public.student_activities
FOR EACH ROW EXECUTE FUNCTION public.handle_student_activity_insert();

-- 8. Seed journal prompts
INSERT INTO public.journal_prompts (prompt_text, tier) VALUES
  ('How many miles away is this country from my home?', 'both'),
  ('What was life like here 30, 50, 100, or 300 years ago?', 'both'),
  ('Write about a kid''s favorite toy in this country.', 'both'),
  ('Write about an inventor or invention from this country.', 'both'),
  ('Find 5 fascinating facts about this country.', 'both'),
  ('What agriculture does this country grow?', 'both'),
  ('What are the extreme weather and natural disasters here?', 'both'),
  ('How do kids travel to and from school?', 'both'),
  ('List important jobs and industries here.', 'both'),
  ('What are the people''s prominent faith and religious beliefs?', 'both'),
  ('Describe the political structure.', 'both'),
  ('How is climate change affecting this country?', 'both'),
  ('Read and share about a famous archaeological find in this country.', 'both');

-- 9. Seed activities (both tier)
INSERT INTO public.activities (title, xp_value, tier, order_index) VALUES
  ('Cook or try a food from this country', 3, 'both', 1),
  ('Watch a movie or video about this country', 2, 'both', 2),
  ('Read for 10 minutes about this country', 2, 'both', 3),
  ('Listen to a song from a composer from this country', 2, 'both', 4),
  ('Draw a map of this country and label 5 geographic features', 3, 'both', 5),
  ('Make a friend or learn about a person from this country', 3, 'both', 6),
  ('Create a Canva or PowerPoint presentation about what you learned', 4, 'both', 7),
  ('Make a homemade postcard and write a message about your imaginary life here', 3, 'both', 8),
  ('Read a fable or folktale that came from this country', 2, 'both', 9),
  ('Learn a game kids play in this country', 2, 'both', 10),
  ('Learn a folk song', 2, 'both', 11),
  ('Make an art project from this country', 3, 'both', 12),
  ('Draw a picture of the country''s leader and write 3 facts about them', 3, 'both', 13),
  ('Dress up, research, and write 5 facts about a famous person from this country', 4, 'both', 14),
  ('Illustrate traditional clothing from this country', 3, 'both', 15),
  ('Research about a holiday, the traditions, and how they celebrate', 3, 'both', 16),
  ('Draw a picture of the country''s flag and write the meaning of the symbols/colors', 2, 'both', 17),
  ('Find a seasoning or food from this country to try at home', 2, 'both', 18),
  ('Draw an animal or plant from this country and learn 2 facts about it', 2, 'both', 19),
  ('Learn 5 words in this country''s language', 2, 'both', 20),
  ('Draw this week''s weather report for a city in this country', 3, 'both', 21),
  ('Draw a historical timeline for this country', 4, 'explorer', 22),
  ('How much does it cost to live in a city or rural area? Create a monthly budget for a family.', 5, 'explorer', 23),
  ('What must we know about this country''s economy (GDP, currency, exports, imports)?', 4, 'explorer', 24),
  ('What is the country''s origin story? How/when did it become a country?', 4, 'explorer', 25),
  ('How is their education system different/similar to your education system?', 3, 'explorer', 26),
  ('Who were the first people to live in the region where this country currently is?', 4, 'explorer', 27),
  ('Devise a 5-day travel itinerary to this country including roundtrip plane tickets and 5 places to visit.', 5, 'explorer', 28),
  ('Create a yearly calendar and share the weather and seasons for each month.', 4, 'explorer', 29),
  ('Learn how to say 5 idioms that have deep meaning and share what they mean.', 3, 'explorer', 30),
  ('Draw a process map to show how people are elected/appointed for a government position.', 4, 'explorer', 31),
  ('Draw a pie chart for the country''s people demographic (ethnicities and/or languages spoken).', 4, 'explorer', 32);
