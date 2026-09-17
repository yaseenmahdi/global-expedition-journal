
-- Fix 1: Prevent students from creating global tags
DROP POLICY IF EXISTS "Users can insert own tags" ON public.custom_tags;
CREATE POLICY "Users can insert own tags"
  ON public.custom_tags FOR INSERT
  TO public
  WITH CHECK (
    auth.uid() = created_by
    AND (
      NOT is_global
      OR has_role(auth.uid(), 'teacher'::app_role)
    )
  );
