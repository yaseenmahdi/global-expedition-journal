-- 1. Fix user_roles SELECT to authenticated only
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 2. Add teacher feedback DELETE policy
CREATE POLICY "Teachers can delete own feedback"
  ON public.teacher_feedback FOR DELETE
  TO authenticated
  USING (auth.uid() = teacher_id AND has_role(auth.uid(), 'teacher'::app_role));

-- 3. Add NULL guards to class_code scoping policies

-- explorations: teachers view
DROP POLICY IF EXISTS "Teachers can view class explorations" ON public.explorations;
CREATE POLICY "Teachers can view class explorations"
  ON public.explorations FOR SELECT
  TO authenticated
  USING (
    has_role(auth.uid(), 'teacher'::app_role)
    AND get_class_code(auth.uid()) IS NOT NULL
    AND get_class_code(student_id) = get_class_code(auth.uid())
  );

-- journal_entries: teachers view
DROP POLICY IF EXISTS "Teachers can view class journal entries" ON public.journal_entries;
CREATE POLICY "Teachers can view class journal entries"
  ON public.journal_entries FOR SELECT
  TO authenticated
  USING (
    has_role(auth.uid(), 'teacher'::app_role)
    AND get_class_code(auth.uid()) IS NOT NULL
    AND get_class_code(student_id) = get_class_code(auth.uid())
  );

-- profiles: teachers view class
DROP POLICY IF EXISTS "Teachers can view profiles in their class" ON public.profiles;
CREATE POLICY "Teachers can view profiles in their class"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    has_role(auth.uid(), 'teacher'::app_role)
    AND class_code IS NOT NULL
    AND get_class_code(auth.uid()) IS NOT NULL
    AND class_code = get_class_code(auth.uid())
  );

-- teacher_feedback: teachers view own (already recreated but add NULL guard)
DROP POLICY IF EXISTS "Teachers can view own feedback" ON public.teacher_feedback;
CREATE POLICY "Teachers can view own feedback"
  ON public.teacher_feedback FOR SELECT
  TO authenticated
  USING (
    auth.uid() = teacher_id
    AND has_role(auth.uid(), 'teacher'::app_role)
    AND get_class_code(auth.uid()) IS NOT NULL
    AND get_class_code(student_id) = get_class_code(auth.uid())
  );
