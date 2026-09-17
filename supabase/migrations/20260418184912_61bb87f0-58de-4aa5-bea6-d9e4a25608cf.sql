ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS has_seen_onboarding boolean NOT NULL DEFAULT false;
