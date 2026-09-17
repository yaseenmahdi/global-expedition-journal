
-- Attach triggers that were missing (functions existed but no triggers were bound)
DROP TRIGGER IF EXISTS trg_student_activity_insert ON public.student_activities;
CREATE TRIGGER trg_student_activity_insert
AFTER INSERT ON public.student_activities
FOR EACH ROW EXECUTE FUNCTION public.handle_student_activity_insert();

DROP TRIGGER IF EXISTS trg_country_research_insert ON public.country_research;
CREATE TRIGGER trg_country_research_insert
AFTER INSERT ON public.country_research
FOR EACH ROW EXECUTE FUNCTION public.handle_country_research_insert();

DROP TRIGGER IF EXISTS trg_country_research_updated_at ON public.country_research;
CREATE TRIGGER trg_country_research_updated_at
BEFORE UPDATE ON public.country_research
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
