
-- Role enum
CREATE TYPE public.app_role AS ENUM ('student', 'teacher');

-- User roles table (separate from profiles per security best practice)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  grade TEXT,
  class_code TEXT,
  avatar_color TEXT DEFAULT '#22c55e',
  xp_points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Security definer to get class code without recursion
CREATE OR REPLACE FUNCTION public.get_class_code(_user_id UUID)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT class_code FROM public.profiles WHERE id = _user_id
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Teachers can view profiles in their class"
  ON public.profiles FOR SELECT
  USING (
    public.has_role(auth.uid(), 'teacher')
    AND class_code IS NOT NULL
    AND class_code = public.get_class_code(auth.uid())
  );

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- User roles policies
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own role"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Explorations table
CREATE TABLE public.explorations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  country_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  progress_pct INTEGER NOT NULL DEFAULT 0,
  checklist JSONB NOT NULL DEFAULT '{"journal_written":false,"tags_added":false,"facts_learned":false,"photo_added":false,"quiz_done":false}',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE (student_id, country_id)
);
ALTER TABLE public.explorations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own explorations"
  ON public.explorations FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view class explorations"
  ON public.explorations FOR SELECT
  USING (
    public.has_role(auth.uid(), 'teacher')
    AND public.get_class_code(student_id) = public.get_class_code(auth.uid())
  );

CREATE POLICY "Students can insert own explorations"
  ON public.explorations FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own explorations"
  ON public.explorations FOR UPDATE
  USING (auth.uid() = student_id);

-- Journal entries table
CREATE TABLE public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  country_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  photo_url TEXT,
  tags TEXT[] DEFAULT '{}',
  word_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own journal entries"
  ON public.journal_entries FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view class journal entries"
  ON public.journal_entries FOR SELECT
  USING (
    public.has_role(auth.uid(), 'teacher')
    AND public.get_class_code(student_id) = public.get_class_code(auth.uid())
  );

CREATE POLICY "Students can insert own journal entries"
  ON public.journal_entries FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own journal entries"
  ON public.journal_entries FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Students can delete own journal entries"
  ON public.journal_entries FOR DELETE
  USING (auth.uid() = student_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_journal_entries_updated_at
  BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Teacher feedback table
CREATE TABLE public.teacher_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entry_id UUID NOT NULL REFERENCES public.journal_entries(id) ON DELETE CASCADE,
  comment TEXT NOT NULL DEFAULT '',
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.teacher_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view own feedback"
  ON public.teacher_feedback FOR SELECT
  USING (auth.uid() = teacher_id);

CREATE POLICY "Students can view feedback on their entries"
  ON public.teacher_feedback FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers can insert feedback"
  ON public.teacher_feedback FOR INSERT
  WITH CHECK (
    auth.uid() = teacher_id
    AND public.has_role(auth.uid(), 'teacher')
  );

CREATE POLICY "Teachers can update own feedback"
  ON public.teacher_feedback FOR UPDATE
  USING (auth.uid() = teacher_id AND public.has_role(auth.uid(), 'teacher'));

-- Custom tags table
CREATE TABLE public.custom_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'primary',
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_global BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.custom_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tags"
  ON public.custom_tags FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can view global tags"
  ON public.custom_tags FOR SELECT
  USING (is_global = true);

CREATE POLICY "Users can insert own tags"
  ON public.custom_tags FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Teachers can make tags global"
  ON public.custom_tags FOR UPDATE
  USING (
    auth.uid() = created_by
    AND public.has_role(auth.uid(), 'teacher')
  );

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
