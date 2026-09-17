-- Remove duplicate trigger aliases introduced by an earlier follow-up migration.
-- Each business event should invoke its XP handler exactly once.

DROP TRIGGER IF EXISTS trg_student_activity_insert ON public.student_activities;
DROP TRIGGER IF EXISTS trg_country_research_insert ON public.country_research;
DROP TRIGGER IF EXISTS trg_country_research_updated_at ON public.country_research;

-- The intended triggers remain:
--   on_student_activity_insert
--   trg_country_research_xp
--   update_country_research_updated_at
