-- Update handle_new_user trigger to assign tier based on grade from signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _role text;
  _grade text;
  _tier text;
BEGIN
  _role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
  IF _role NOT IN ('student', 'teacher') THEN
    _role := 'student';
  END IF;

  _grade := NEW.raw_user_meta_data->>'grade';

  IF _role = 'student' THEN
    IF _grade IN ('K', '1st', '2nd', '3rd') THEN
      _tier := 'junior';
    ELSIF _grade IN ('4th', '5th', '6th', '7th', '8th') THEN
      _tier := 'explorer';
    ELSE
      _tier := 'explorer';
    END IF;
  END IF;

  INSERT INTO public.profiles (id, name, grade, tier)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    _grade,
    _tier
  );

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, _role::app_role);

  RETURN NEW;
END;
$function$;

-- Update student_activities trigger to also update exploration status based on XP threshold
CREATE OR REPLACE FUNCTION public.handle_student_activity_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _new_total int;
BEGIN
  -- Log to xp_ledger
  INSERT INTO public.xp_ledger (student_id, country_id, activity_id, xp_amount, reason)
  VALUES (NEW.student_id, NEW.country_id, NEW.activity_id, NEW.xp_earned, 'activity_completed');

  -- Update profile total XP
  UPDATE public.profiles
  SET total_xp = total_xp + NEW.xp_earned
  WHERE id = NEW.student_id;

  -- Ensure exploration row exists, then update XP and status
  INSERT INTO public.explorations (student_id, country_id, status, total_xp_earned)
  VALUES (NEW.student_id, NEW.country_id, 'in_progress', NEW.xp_earned)
  ON CONFLICT DO NOTHING;

  UPDATE public.explorations
  SET total_xp_earned = total_xp_earned + NEW.xp_earned
  WHERE student_id = NEW.student_id
    AND country_id = NEW.country_id
  RETURNING total_xp_earned INTO _new_total;

  -- Update status based on XP threshold
  UPDATE public.explorations
  SET status = CASE
    WHEN total_xp_earned >= 15 THEN 'completed'
    WHEN total_xp_earned > 0 THEN 'in_progress'
    ELSE 'not_started'
  END,
  completed_at = CASE
    WHEN total_xp_earned >= 15 AND completed_at IS NULL THEN now()
    ELSE completed_at
  END,
  progress_pct = LEAST(100, (total_xp_earned * 100) / 15)
  WHERE student_id = NEW.student_id AND country_id = NEW.country_id;

  RETURN NEW;
END;
$function$;

-- Ensure trigger is attached
DROP TRIGGER IF EXISTS on_student_activity_insert ON public.student_activities;
CREATE TRIGGER on_student_activity_insert
  AFTER INSERT ON public.student_activities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_student_activity_insert();

-- Ensure handle_new_user trigger attached on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
