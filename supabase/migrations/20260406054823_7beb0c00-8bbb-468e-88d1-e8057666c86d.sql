
CREATE TABLE public.teacher_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL,
  resource_key text NOT NULL,
  name text NOT NULL,
  url text NOT NULL DEFAULT '',
  emoji text NOT NULL DEFAULT '🔗',
  description text NOT NULL DEFAULT '',
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(teacher_id, resource_key)
);

ALTER TABLE public.teacher_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view own resources"
ON public.teacher_resources FOR SELECT TO authenticated
USING (
  (teacher_id = auth.uid() AND has_role(auth.uid(), 'teacher'::app_role))
  OR
  (has_role(auth.uid(), 'student'::app_role) AND get_class_code(teacher_id) = get_class_code(auth.uid()) AND visible = true)
);

CREATE POLICY "Teachers can insert own resources"
ON public.teacher_resources FOR INSERT TO authenticated
WITH CHECK (teacher_id = auth.uid() AND has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Teachers can update own resources"
ON public.teacher_resources FOR UPDATE TO authenticated
USING (teacher_id = auth.uid() AND has_role(auth.uid(), 'teacher'::app_role));

CREATE POLICY "Teachers can delete own resources"
ON public.teacher_resources FOR DELETE TO authenticated
USING (teacher_id = auth.uid() AND has_role(auth.uid(), 'teacher'::app_role));
