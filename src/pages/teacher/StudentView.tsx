import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { countries, getCountry } from "@/data/countries";
import { useState } from "react";
import { ArrowLeft, Star, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const XP_GOAL = 15;

const tierFor = (xp: number) =>
  xp >= 100
    ? { label: "Explorer", emoji: "🚀", className: "bg-primary/15 text-primary border-primary/40" }
    : { label: "Junior", emoji: "🌱", className: "bg-accent/40 text-accent-foreground border-accent/60" };

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} onClick={() => onChange(i)} className="transition-transform hover:scale-110">
          <Star className={`w-5 h-5 ${i <= value ? "fill-yellow text-yellow" : "text-muted-foreground/30"}`} />
        </button>
      ))}
    </div>
  );
}

function FeedbackSection({ entryId, studentId }: { entryId: string; studentId: string }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);

  const { data: feedback } = useQuery({
    queryKey: ["teacher_feedback", entryId, user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teacher_feedback")
        .select("*")
        .eq("entry_id", entryId)
        .eq("teacher_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      if (data) { setRating(data.rating || 0); setComment(data.comment || ""); }
      return data;
    },
    enabled: !!user,
  });

  const saveFeedback = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      if (feedback) {
        const { error } = await supabase
          .from("teacher_feedback")
          .update({ rating, comment } as any)
          .eq("id", feedback.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("teacher_feedback")
          .insert({ entry_id: entryId, student_id: studentId, teacher_id: user.id, rating, comment } as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher_feedback", entryId] });
      setEditing(false);
      toast.success("Feedback saved! 💬");
    },
    onError: (err: any) => toast.error(err.message || "Failed to save feedback"),
  });

  if (feedback && !editing) {
    return (
      <div className="bg-muted/50 rounded-xl p-3 mt-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`w-4 h-4 ${i <= (feedback.rating || 0) ? "fill-yellow text-yellow" : "text-muted-foreground/20"}`} />
            ))}
          </div>
          <button onClick={() => setEditing(true)} className="text-muted-foreground hover:text-primary">
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-sm text-foreground">{feedback.comment}</p>
        <p className="text-[10px] text-muted-foreground mt-1">{new Date(feedback.created_at).toLocaleDateString()}</p>
      </div>
    );
  }

  return (
    <div className="bg-muted/50 rounded-xl p-3 mt-2">
      <p className="text-xs font-bold text-foreground mb-2">{feedback ? "Edit Feedback" : "Leave Feedback"}</p>
      <StarRating value={rating} onChange={setRating} />
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Write a comment for this student..."
        rows={2}
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground mt-2 resize-none"
      />
      <div className="flex gap-2 mt-2">
        <Button onClick={() => saveFeedback.mutate()} disabled={saveFeedback.isPending} size="sm">
          {saveFeedback.isPending ? "Saving..." : "Leave Comment 💬"}
        </Button>
        {editing && <Button onClick={() => setEditing(false)} variant="ghost" size="sm">Cancel</Button>}
      </div>
    </div>
  );
}

export default function StudentView() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const { data: student } = useQuery({
    queryKey: ["student_profile", studentId],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", studentId!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!studentId,
  });

  const { data: explorations = [] } = useQuery({
    queryKey: ["student_explorations", studentId],
    queryFn: async () => {
      const { data, error } = await supabase.from("explorations").select("*").eq("student_id", studentId!);
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId,
  });

  const { data: entries = [] } = useQuery({
    queryKey: ["student_entries", studentId],
    queryFn: async () => {
      const { data, error } = await supabase.from("journal_entries").select("*").eq("student_id", studentId!).order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId,
  });

  // Activity log: research saves + completed activities (with title)
  const { data: research = [] } = useQuery({
    queryKey: ["student_research", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("country_research")
        .select("*")
        .eq("student_id", studentId!)
        .order("saved_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId,
  });

  const { data: activityLog = [] } = useQuery({
    queryKey: ["student_activity_log", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_activities")
        .select("*, activities(title)")
        .eq("student_id", studentId!)
        .order("completed_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!studentId,
  });

  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  if (!student) {
    return <div className="p-8 text-center text-muted-foreground">Loading student...</div>;
  }

  const totalXp = student.total_xp || 0;
  const tier = tierFor(totalXp);
  const initials = (student.name || "?").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  // Build per-country XP from research + student_activities (cap research at 5/country)
  const countryXpMap = new Map<string, { researchXp: number; activityXp: number }>();
  for (const r of research as any[]) {
    const cur = countryXpMap.get(r.country_id) || { researchXp: 0, activityXp: 0 };
    cur.researchXp = Math.min(5, cur.researchXp + 1);
    countryXpMap.set(r.country_id, cur);
  }
  for (const a of activityLog as any[]) {
    const cur = countryXpMap.get(a.country_id) || { researchXp: 0, activityXp: 0 };
    cur.activityXp += a.xp_earned || 0;
    countryXpMap.set(a.country_id, cur);
  }

  const countriesWithProgress = Array.from(countryXpMap.entries())
    .map(([countryId, xp]) => ({
      country: getCountry(countryId),
      countryId,
      ...xp,
      total: Math.min(XP_GOAL, xp.researchXp + xp.activityXp),
    }))
    .filter(p => p.country)
    .sort((a, b) => b.total - a.total);

  // Combined activity log (research + activities), sorted by date desc
  const combinedLog = [
    ...research.map((r: any) => ({
      id: `r-${r.id}`,
      date: r.saved_at,
      countryId: r.country_id,
      label: `Research: ${r.fact_type}`,
      xp: 1, // capped server-side; this is the displayed per-row award
      type: "research" as const,
    })),
    ...activityLog.map((a: any) => ({
      id: `a-${a.id}`,
      date: a.completed_at,
      countryId: a.country_id,
      label: a.activities?.title || "Activity",
      xp: a.xp_earned || 0,
      type: "activity" as const,
    })),
  ].sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime());

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-slide-in">
      <button onClick={() => navigate("/teacher/students")} className="text-primary font-bold hover:underline mb-4 inline-flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Students
      </button>

      {/* Student header */}
      <div className="bg-card rounded-2xl border-2 border-border p-6 flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: student.avatar_color || "#22c55e" }}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-heading text-foreground">{student.name}</h1>
            <span className={`text-sm font-bold px-3 py-1 rounded-full border-2 ${tier.className}`}>
              {tier.emoji} {tier.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-semibold">
            Grade: {student.grade || "—"} · {totalXp} XP
          </p>
          <p className="text-xs text-muted-foreground">Member since {new Date(student.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Passport stamps */}
      <div className="mb-6">
        <h2 className="text-lg font-heading text-foreground mb-3">Passport Stamps</h2>
        <div className="bg-card rounded-2xl border-2 border-border p-4">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {countries.map(c => {
              const exp = explorations.find((e: any) => e.country_id === c.id);
              const s = exp?.status;
              if (s === "completed") return (
                <div key={c.id} className="flex flex-col items-center gap-0.5 bg-primary/10 rounded-xl p-1.5 border border-primary/30">
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-[8px] font-bold text-primary text-center leading-tight truncate w-full">{c.name}</span>
                </div>
              );
              if (s === "in_progress") return (
                <div key={c.id} className="flex flex-col items-center gap-0.5 bg-secondary/10 rounded-xl p-1.5 border border-secondary/30">
                  <span className="text-xl opacity-70">{c.flag}</span>
                  <span className="text-[8px] font-semibold text-secondary text-center leading-tight truncate w-full">{c.name}</span>
                </div>
              );
              return (
                <div key={c.id} className="flex flex-col items-center gap-0.5 rounded-xl p-1.5 opacity-20">
                  <span className="text-xl grayscale">{c.flag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Country Progress (XP-based, /15) */}
      <div className="mb-6">
        <h2 className="text-lg font-heading text-foreground mb-3">Country Progress (XP / {XP_GOAL})</h2>
        {countriesWithProgress.length === 0 ? (
          <div className="bg-card rounded-2xl border-2 border-border p-6 text-center">
            <p className="text-sm text-muted-foreground font-semibold">No country progress yet 🌍</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {countriesWithProgress.map(p => {
              const pct = Math.min(100, (p.total / XP_GOAL) * 100);
              const isComplete = p.total >= XP_GOAL;
              return (
                <div key={p.countryId} className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
                  <span className="text-2xl">{p.country!.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-foreground truncate">{p.country!.name}</p>
                      <p className="text-[11px] text-muted-foreground whitespace-nowrap">
                        Research {p.researchXp}/5 · Quiz/Activity {p.activityXp} XP
                      </p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isComplete ? "bg-primary" : "bg-secondary"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-xs font-bold whitespace-nowrap ${isComplete ? "text-primary" : "text-secondary"}`}>
                    {p.total}/{XP_GOAL} XP
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Activity Log */}
      <div className="mb-6">
        <h2 className="text-lg font-heading text-foreground mb-3">Activity Log ({combinedLog.length})</h2>
        {combinedLog.length === 0 ? (
          <div className="bg-card rounded-2xl border-2 border-border p-6 text-center">
            <p className="text-sm text-muted-foreground font-semibold">No activities yet ✨</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border-2 border-border overflow-hidden">
            <div className="overflow-x-auto max-h-96">
              <table className="w-full">
                <thead className="bg-muted/40 sticky top-0">
                  <tr className="border-b-2 border-border">
                    <th className="text-left px-4 py-2 text-xs font-bold text-muted-foreground uppercase">Date</th>
                    <th className="text-left px-4 py-2 text-xs font-bold text-muted-foreground uppercase">Country</th>
                    <th className="text-left px-4 py-2 text-xs font-bold text-muted-foreground uppercase">Activity</th>
                    <th className="text-center px-4 py-2 text-xs font-bold text-muted-foreground uppercase">XP</th>
                  </tr>
                </thead>
                <tbody>
                  {combinedLog.map(row => {
                    const c = getCountry(row.countryId);
                    return (
                      <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-2 text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(row.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <span className="mr-1">{c?.flag}</span>
                          <span className="text-foreground font-semibold">{c?.name || row.countryId}</span>
                        </td>
                        <td className="px-4 py-2 text-sm text-foreground">
                          <span className="mr-1">{row.type === "research" ? "📝" : "🎯"}</span>
                          {row.label}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <span className="text-xs font-bold text-primary">+{row.xp}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Journal entries */}
      <h2 className="text-lg font-heading text-foreground mb-3">Journal Entries ({entries.length})</h2>
      {entries.length === 0 ? (
        <div className="bg-card rounded-2xl border-2 border-border p-8 text-center">
          <p className="text-2xl mb-2">📝</p>
          <p className="text-sm text-muted-foreground font-semibold">No journal entries yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry: any) => {
            const country = getCountry(entry.country_id);
            const isExpanded = expandedEntry === entry.id;
            return (
              <div key={entry.id} className="bg-card rounded-2xl border-2 border-border p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{country?.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-sm text-foreground">{entry.title}</h3>
                      <button onClick={() => setExpandedEntry(isExpanded ? null : entry.id)} className="text-xs text-primary font-bold hover:underline">
                        {isExpanded ? "Collapse" : "Read Full Entry"}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(entry.created_at).toLocaleDateString()} · {entry.word_count} words</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(entry.tags || []).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/60 text-accent-foreground">{tag}</span>
                      ))}
                    </div>
                    {!isExpanded && <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{entry.content}</p>}
                    {isExpanded && (
                      <div className="mt-2">
                        <p className="text-sm text-foreground whitespace-pre-wrap">{entry.content}</p>
                        {entry.photo_url && <img src={entry.photo_url} alt="Student upload" className="mt-3 rounded-xl max-h-60 object-cover" />}
                      </div>
                    )}

                    {/* Feedback */}
                    <FeedbackSection entryId={entry.id} studentId={studentId!} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
