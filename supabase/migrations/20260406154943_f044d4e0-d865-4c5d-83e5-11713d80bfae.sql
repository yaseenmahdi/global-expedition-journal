-- 1. Add explicit deny policies on user_roles for INSERT, UPDATE, DELETE
CREATE POLICY "No direct inserts on user_roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "No updates on user_roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (false);

CREATE POLICY "No deletes on user_roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (false);

-- 2. Allow users to delete their own custom tags
CREATE POLICY "Users can delete own tags"
  ON public.custom_tags FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- 3. Fix teacher feedback: scope teacher view to their class only
DROP POLICY IF EXISTS "Teachers can view own feedback" ON public.teacher_feedback;

CREATE POLICY "Teachers can view own feedback"
  ON public.teacher_feedback FOR SELECT
  TO authenticated
  USING (
    auth.uid() = teacher_id
    AND has_role(auth.uid(), 'teacher'::app_role)
    AND get_class_code(student_id) = get_class_code(auth.uid())
  );
