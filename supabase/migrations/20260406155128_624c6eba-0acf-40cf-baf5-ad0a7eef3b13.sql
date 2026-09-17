-- 1. Fix custom_tags UPDATE policy to prevent ownership reassignment
DROP POLICY IF EXISTS "Teachers can make tags global" ON public.custom_tags;
CREATE POLICY "Teachers can make tags global"
  ON public.custom_tags FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by AND has_role(auth.uid(), 'teacher'::app_role))
  WITH CHECK (auth.uid() = created_by AND has_role(auth.uid(), 'teacher'::app_role));

-- 2. Fix teacher_feedback INSERT to scope to own class
DROP POLICY IF EXISTS "Teachers can insert feedback" ON public.teacher_feedback;
CREATE POLICY "Teachers can insert feedback"
  ON public.teacher_feedback FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = teacher_id
    AND has_role(auth.uid(), 'teacher'::app_role)
    AND get_class_code(auth.uid()) IS NOT NULL
    AND get_class_code(student_id) = get_class_code(auth.uid())
  );

-- Also fix UPDATE policy for same scoping
DROP POLICY IF EXISTS "Teachers can update own feedback" ON public.teacher_feedback;
CREATE POLICY "Teachers can update own feedback"
  ON public.teacher_feedback FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = teacher_id
    AND has_role(auth.uid(), 'teacher'::app_role)
    AND get_class_code(auth.uid()) IS NOT NULL
    AND get_class_code(student_id) = get_class_code(auth.uid())
  );
