import { getCountry } from "@/data/countries";
import { useParams, useNavigate } from "react-router-dom";
import { useExploration, useStartExploration } from "@/hooks/useExplorations";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { useStudentActivities, awardActivityByTitle } from "@/hooks/useActivities";
import { ActivityChecklist } from "@/components/ActivityChecklist";
import { showXpFloat } from "@/components/XpFloater";
import CountryQuiz from "@/components/CountryQuiz";
import { toast } from "sonner";
import KidFriendlyResources from "@/components/KidFriendlyResources";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InteractiveFactCard } from "@/components/InteractiveFactCard";
import { useCountryResearch, RESEARCH_XP_CAP } from "@/hooks/useCountryResearch";

const XP_GOAL = 15;

export default function CountryDetail() {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const country = countryId ? getCountry(countryId) : undefined;
  const { data: exploration } = useExploration(countryId);
  const startExploration = useStartExploration();
  // (XP-based progress; old checklist removed)
  const { data: entries = [] } = useJournalEntries(countryId);
  const { data: studentActs = [] } = useStudentActivities(countryId);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: researchRows = [] } = useCountryResearch(countryId);

  // Teacher feedback for completed entries
  const { data: feedback = [] } = useQuery({
    queryKey: ["teacher_feedback", countryId, user?.id],
    queryFn: async () => {
      if (!user || !countryId) return [];
      const { data, error } = await supabase
        .from("teacher_feedback")
        .select("*")
        .eq("student_id", user.id);
      if (error) throw error;
      // Filter to only entries for this country
      const entryIds = (entries as any[]).map((e: any) => e.id);
      return (data || []).filter((f: any) => entryIds.includes(f.entry_id));
    },
    enabled: !!user && !!countryId && (entries as any[]).length > 0,
  });

  if (!country) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Country not found.</p>
        <button onClick={() => navigate("/countries")} className="mt-4 text-primary font-bold hover:underline">← Back to Countries</button>
      </div>
    );
  }

  const status = exploration?.status || "not_started";
  const xpEarned = (exploration as any)?.total_xp_earned || 0;
  const xpPct = Math.min(100, (xpEarned / XP_GOAL) * 100);

  const handleStartExploring = async () => {
    try {
      await startExploration.mutateAsync(country.id);
      toast.success(`Started exploring ${country.name}! 🚀`);
    } catch (err: any) {
      toast.error(err.message || "Failed to start exploration");
    }
  };

  const facts: Array<{ key: string; emoji: string; label: string; value: string; prompt: string }> = [
    { key: "language", emoji: "🗣️", label: "Language", value: country.language, prompt: `Find out how to say "hello" and "thank you" in ${country.language}. Write what you learned!` },
    { key: "population", emoji: "👥", label: "Population", value: country.population, prompt: `${country.name} has about ${country.population} people. How does that compare to your town or country? What surprised you?` },
    { key: "food", emoji: "🍽️", label: "Famous Food", value: country.famousFood, prompt: `Look up ${country.famousFood}. What ingredients are in it? Would you try it? Why or why not?` },
    { key: "landmark", emoji: "🏰", label: "Landmark", value: country.famousLandmark, prompt: `Research ${country.famousLandmark}. When was it built? Why is it special? Write 2–3 sentences about what you discovered.` },
    { key: "funfact", emoji: "⭐", label: "Fun Fact", value: country.funFact, prompt: `Find one MORE amazing fact about ${country.name} that surprised you. Write it down here!` },
  ];


  const researchXpEarned = Math.min(RESEARCH_XP_CAP, researchRows.length);
  const xpAvailable = researchXpEarned < RESEARCH_XP_CAP;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto animate-fade-slide-in">
      <button onClick={() => navigate("/countries")} className="text-primary font-bold hover:underline mb-4 inline-block">← Back to Countries</button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-6xl">{country.flag}</span>
        <div>
          <h1 className="text-3xl font-heading text-foreground">{country.name}</h1>
          <div className="flex gap-2 mt-1">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{country.continent}</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">🏛️ {country.capital}</span>
          </div>
        </div>
      </div>

      {/* Interactive fact research cards */}
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-bold text-foreground">Research the facts ✨</p>
        <p className="text-xs font-semibold text-muted-foreground">{researchXpEarned}/{RESEARCH_XP_CAP} research XP</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {facts.map(f => {
          const existing = researchRows.find(r => r.fact_type === f.key);
          return (
            <InteractiveFactCard
              key={f.key}
              countryId={country.id}
              factType={f.key}
              emoji={f.emoji}
              label={f.label}
              value={f.value}
              prompt={f.prompt}
              existing={existing}
              xpAvailable={xpAvailable}
            />
          );
        })}
      </div>

      {/* === STATE: Completed === */}
      {status === "completed" && (
        <>
          <div className="bg-primary/10 border-2 border-primary rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">✅</span>
              <div className="flex-1">
                <p className="text-xl font-heading text-primary">Country Completed!</p>
                <p className="text-sm text-muted-foreground">You've earned the {country.flag} {country.name} passport stamp!</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-card rounded-xl p-3 text-center border border-border">
                <p className="text-2xl font-heading text-primary">{xpEarned}</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Total XP</p>
              </div>
              <div className="bg-card rounded-xl p-3 text-center border border-border">
                <p className="text-2xl font-heading text-foreground">{studentActs.length}</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Activities</p>
              </div>
              <div className="bg-card rounded-xl p-3 text-center border border-border">
                <p className="text-sm font-heading text-foreground mt-1">
                  {exploration?.completed_at ? new Date(exploration.completed_at).toLocaleDateString() : "—"}
                </p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>

          {/* Journal entries */}
          {(entries as any[]).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-heading text-foreground mb-3">Your Journal Entries</h2>
              <div className="flex flex-col gap-3">
                {(entries as any[]).map((entry: any) => (
                  <div key={entry.id} className="bg-card rounded-2xl border-2 border-border p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-heading text-sm text-foreground">{entry.title}</h3>
                      <button onClick={() => navigate(`/journal`)} className="text-xs text-primary font-bold hover:underline">Edit</button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{new Date(entry.created_at).toLocaleDateString()} · {entry.word_count} words</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{entry.content}</p>
                    <div className="flex flex-wrap gap-1">
                      {(entry.tags || []).map((tag: string) => (
                        <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/60 text-accent-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* XP earned summary */}
          <div className="bg-card rounded-2xl border-2 border-border p-6 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading text-foreground">Total XP Earned</h2>
              <span className="text-2xl font-heading text-primary">{xpEarned} XP ⭐</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Activities are coming soon — this country is marked complete.
            </p>
          </div>

          {/* Teacher feedback */}
          {(feedback as any[]).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-heading text-foreground mb-3">Teacher Feedback</h2>
              {(feedback as any[]).map((fb: any) => (
                <div key={fb.id} className="bg-card rounded-2xl border-2 border-primary/30 p-5 mb-3">
                  {fb.rating && <p className="text-lg mb-1">{"⭐".repeat(fb.rating)}</p>}
                  <p className="text-sm text-foreground">{fb.comment}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(fb.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
          {/* Read-only completed activity list */}
          <div className="mb-6">
            <ActivityChecklist countryId={country.id} countryName={country.name} totalXp={xpEarned} />
          </div>
        </>
      )}

      {/* === STATE: In Progress === */}
      {status === "in_progress" && exploration && (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-foreground text-sm">XP Earned</p>
              <p className="font-heading text-primary text-lg">{xpEarned} / {XP_GOAL} XP ⭐</p>
            </div>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div
                className={`h-full rounded-full bg-primary transition-all duration-500 ${xpPct === 100 ? "shadow-[0_0_12px_hsl(var(--primary)/0.5)]" : ""}`}
                style={{ width: `${xpPct}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Earn {Math.max(0, XP_GOAL - xpEarned)} more XP by completing activities to earn this country's stamp! 🌟
            </p>
          </div>

          {/* Activity checklist */}
          <div className="mb-6">
            <ActivityChecklist countryId={country.id} countryName={country.name} totalXp={xpEarned} />
          </div>

          {/* Optional quiz with auto-award */}
          <div className="bg-card rounded-2xl border-2 border-border p-5 mb-6 flex items-center gap-3">
            <span className="text-2xl">❓</span>
            <div className="flex-1">
              <p className="font-heading text-foreground text-sm">Test your knowledge!</p>
              <p className="text-xs text-muted-foreground">Take the country quiz to earn bonus XP.</p>
            </div>
            <CountryQuiz
              countryId={country.id}
              isComplete={false}
              onComplete={async () => {
                if (!user) return;
                const res = await awardActivityByTitle({
                  userId: user.id,
                  countryId: country.id,
                  title: "Watch a movie or video about this country",
                });
                if (res.awarded && res.xp) {
                  showXpFloat(res.xp);
                  toast.success(`Quiz complete! +${res.xp} XP earned 🌟`);
                  queryClient.invalidateQueries({ queryKey: ["student_activities"] });
                  queryClient.invalidateQueries({ queryKey: ["explorations"] });
                  queryClient.invalidateQueries({ queryKey: ["exploration"] });
                } else {
                  toast.success("Great quiz!");
                }
              }}
            />
          </div>

          {/* Journal entries for this country */}
          {(entries as any[]).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-heading text-foreground mb-3">Your Journal Entries</h2>
              <div className="flex flex-col gap-3">
                {(entries as any[]).map((entry: any) => (
                  <div key={entry.id} className="bg-card rounded-2xl border-2 border-border p-4">
                    <h3 className="font-heading text-sm text-foreground">{entry.title}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(entry.created_at).toLocaleDateString()} · {entry.word_count} words</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{entry.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* === STATE: Not Started === */}
      {status === "not_started" && (
        <div className="mb-6">
          <KidFriendlyResources countryName={country.name} countryId={country.id} />
          <button
            onClick={handleStartExploring}
            disabled={startExploration.isPending}
            className="btn-press w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-lg transition-all hover:opacity-90 disabled:opacity-50 mt-6"
          >
            {startExploration.isPending ? "Starting..." : "Start Exploring This Country! 🚀"}
          </button>
        </div>
      )}

      {/* Resources for in_progress & completed */}
      {status !== "not_started" && (
        <KidFriendlyResources countryName={country.name} countryId={country.id} />
      )}
    </div>
  );
}
