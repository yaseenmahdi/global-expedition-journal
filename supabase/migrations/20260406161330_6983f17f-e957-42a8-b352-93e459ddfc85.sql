-- Fix: Prevent students from changing their class_code to access other classes' data
-- Replace the permissive UPDATE policy with one that prevents class_code changes

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Allow users to update their own profile, but prevent changing class_code
-- Uses a WITH CHECK that ensures class_code remains unchanged
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO public
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND (
    class_code IS NOT DISTINCT FROM (SELECT p.class_code FROM public.profiles p WHERE p.id = auth.uid())
  )
);
