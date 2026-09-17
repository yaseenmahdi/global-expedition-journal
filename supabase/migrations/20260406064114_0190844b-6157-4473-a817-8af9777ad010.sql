
-- 1. Drop all existing INSERT policies on user_roles
DROP POLICY IF EXISTS "Users can insert own role" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert student role only" ON public.user_roles;

-- 2. Update handle_new_user to also insert into user_roles from signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _role text;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''));

  -- Assign role from signup metadata (default to 'student' if not provided)
  _role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');

  -- Only allow valid roles
  IF _role NOT IN ('student', 'teacher') THEN
    _role := 'student';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, _role::app_role);

  RETURN NEW;
END;
$$;
