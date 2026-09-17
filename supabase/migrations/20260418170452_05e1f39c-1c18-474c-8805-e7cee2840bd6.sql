-- 1. country_research table for interactive country fact responses
CREATE TABLE public.country_research (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  country_id TEXT NOT NULL,
  fact_type TEXT NOT NULL,
  response TEXT NOT NULL DEFAULT '',
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, country_id, fact_type)
);

ALTER TABLE public.country_research ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own research"
  ON public.country_research FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own research"
  ON public.country_research FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own research"
  ON public.country_research FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view class research"
  ON public.country_research FOR SELECT
  TO authenticated
  USING (
    has_role(auth.uid(), 'teacher'::app_role)
    AND get_class_code(auth.uid()) IS NOT NULL
    AND get_class_code(student_id) = get_class_code(auth.uid())
  );

CREATE TRIGGER update_country_research_updated_at
  BEFORE UPDATE ON public.country_research
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: award 1 XP per fact_type, capped at 5 XP per country.
-- Inserts an xp_ledger row directly (bypasses no-client-insert RLS via SECURITY DEFINER)
-- and bumps profiles.total_xp + explorations.total_xp_earned, mirroring the activity trigger.
CREATE OR REPLACE FUNCTION public.handle_country_research_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _research_xp_so_far int;
BEGIN
  -- Count existing research-XP rows for this student/country (excluding this new one)
  SELECT COUNT(*) INTO _research_xp_so_far
  FROM public.xp_ledger
  WHERE student_id = NEW.student_id
    AND country_id = NEW.country_id
    AND reason = 'country_research';

  IF _research_xp_so_far >= 5 THEN
    RETURN NEW; -- cap reached, no XP
  END IF;

  -- Award 1 XP
  INSERT INTO public.xp_ledger (student_id, country_id, activity_id, xp_amount, reason)
  VALUES (NEW.student_id, NEW.country_id, NULL, 1, 'country_research');

  UPDATE public.profiles
  SET total_xp = total_xp + 1
  WHERE id = NEW.student_id;

  INSERT INTO public.explorations (student_id, country_id, status, total_xp_earned)
  VALUES (NEW.student_id, NEW.country_id, 'in_progress', 1)
  ON CONFLICT DO NOTHING;

  UPDATE public.explorations
  SET total_xp_earned = total_xp_earned + 1,
      status = CASE
        WHEN total_xp_earned + 1 >= 15 THEN 'completed'
        WHEN total_xp_earned + 1 > 0 THEN 'in_progress'
        ELSE 'not_started'
      END,
      completed_at = CASE
        WHEN total_xp_earned + 1 >= 15 AND completed_at IS NULL THEN now()
        ELSE completed_at
      END,
      progress_pct = LEAST(100, ((total_xp_earned + 1) * 100) / 15)
  WHERE student_id = NEW.student_id
    AND country_id = NEW.country_id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_country_research_xp
  AFTER INSERT ON public.country_research
  FOR EACH ROW EXECUTE FUNCTION public.handle_country_research_insert();

-- 2. Storage bucket for journal photos (public for easy display)
INSERT INTO storage.buckets (id, name, public)
VALUES ('journal-photos', 'journal-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Journal photos are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'journal-photos');

CREATE POLICY "Students can upload own journal photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'journal-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Students can update own journal photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'journal-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Students can delete own journal photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'journal-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
