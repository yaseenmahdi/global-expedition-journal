import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries, getCountry } from "@/data/countries";
import { useAuth } from "@/contexts/AuthContext";
import { useExplorations } from "@/hooks/useExplorations";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Pencil, FilePlus2 } from "lucide-react";

const XP_GOAL = 15;
const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: "Done! ✅", color: "bg-primary text-primary-foreground" },
  in_progress: { label: "In Progress 🌀", color: "text-white" },
  not_started: { label: "New! 🌟", color: "bg-accent text-accent-foreground" },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { data: explorations = [] } = useExplorations();
  const { data: journalEntries = [] } = useJournalEntries();
  const [entryModal, setEntryModal] = useState<any | null>(null);

  const completedCount = explorations.filter(e => e.status === "completed").length;
  const inProgressCount = explorations.filter(e => e.status === "in_progress").length;
  const totalXp = (profile as any)?.total_xp ?? profile?.xp_points ?? 0;

  const statCards = [
    { label: "Countries Explored", value: completedCount, emoji: "🌍", colorClass: "border-primary bg-primary/5", to: "/my-countries/completed" },
    { label: "In Progress", value: inProgressCount, emoji: "🌀", colorClass: "border-secondary bg-secondary/5", to: "/my-countries/in-progress" },
    { label: "Journal Entries", value: journalEntries.length, emoji: "📓", colorClass: "border-accent bg-accent/10", to: "/my-journal" },
    { label: "Total XP", value: totalXp, emoji: "⭐", colorClass: "border-orange bg-orange/5", to: "/xp-ledger" },
  ];

  const inProgress = explorations
    .filter(e => e.status === "in_progress" || e.status === "completed")
    .slice(0, 3);

  const recentEntries = journalEntries.slice(0, 3);

  const handleCountryClick = (exp: any) => {
    navigate(`/countries/${exp.country_id}`);
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-slide-in">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl text-foreground mb-1">
          Welcome back, {profile?.name || "Explorer"}! 🌟
        </h1>
        <p className="text-muted-foreground font-semibold text-lg">
          Explorer Level {Math.floor(completedCount / 3) + 1} · {completedCount} countries discovered
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <button
            key={card.label}
            onClick={() => navigate(card.to)}
            className={`card-hover btn-press text-left rounded-2xl border-2 p-5 ${card.colorClass} focus:outline-none focus:ring-2 focus:ring-primary/40`}
          >
            <span className="text-2xl">{card.emoji}</span>
            <p className="text-3xl font-heading mt-2">{card.value}</p>
            <p className="text-sm font-semibold text-muted-foreground">{card.label}</p>
          </button>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl text-foreground mb-4">Country Progress</h2>
        {inProgress.length === 0 ? (
          <p className="text-muted-foreground font-semibold">Start exploring countries to see your progress here! 🚀</p>
        ) : (
          <div className="flex flex-col gap-3">
            {inProgress.map((exp) => {
              const country = getCountry(exp.country_id);
              if (!country) return null;
              const status = statusConfig[exp.status] || statusConfig.not_started;
              const xp = (exp as any).total_xp_earned || 0;
              const pct = Math.min(100, (xp / XP_GOAL) * 100);
              return (
                <button
                  key={exp.country_id}
                  onClick={() => handleCountryClick(exp)}
                  className="card-hover btn-press text-left flex items-center gap-4 bg-card rounded-2xl border-2 border-border p-4 w-full focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <span className="text-3xl">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-foreground">{country.name}</p>
                      <p className="text-xs font-bold text-muted-foreground">{xp} XP earned</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 mt-1 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${exp.status === "completed" ? "bg-primary" : "bg-secondary"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${status.color}`}
                    style={exp.status === "in_progress" ? { backgroundColor: "#14b8a6" } : undefined}
                  >
                    {status.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl text-foreground mb-4">Recent Journal Entries</h2>
        {recentEntries.length === 0 ? (
          <p className="text-muted-foreground font-semibold">Write your first journal entry to see it here! ✍️</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentEntries.map((entry) => {
              const country = getCountry(entry.country_id);
              return (
                <button
                  key={entry.id}
                  onClick={() => setEntryModal(entry)}
                  className="card-hover btn-press text-left bg-card rounded-2xl border-2 border-border p-5 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{country?.flag}</span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-heading text-base text-foreground mb-2">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{entry.content}</p>
                  <div className="flex flex-wrap gap-1">
                    {(entry.tags || []).map((tag: string) => (
                      <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/60 text-accent-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Journal entry modal */}
      <Dialog open={!!entryModal} onOpenChange={(open) => !open && setEntryModal(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg flex items-center gap-2">
              {entryModal && <span className="text-2xl">{getCountry(entryModal.country_id)?.flag}</span>}
              {entryModal?.title || "Journal Entry"}
            </DialogTitle>
            <DialogDescription>
              What would you like to do?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => {
                if (!entryModal) return;
                navigate("/journal", { state: { editEntryId: entryModal.id, countryId: entryModal.country_id } });
                setEntryModal(null);
              }}
              className="btn-press flex items-center gap-3 w-full p-4 rounded-xl border-2 border-primary/40 bg-primary/5 hover:bg-primary/10 text-left"
            >
              <Pencil className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="font-bold text-foreground">Edit this entry ✏️</span>
            </button>
            <button
              onClick={() => {
                if (!entryModal) return;
                const c = getCountry(entryModal.country_id);
                navigate("/journal", { state: { newForCountry: entryModal.country_id } });
                setEntryModal(null);
              }}
              className="btn-press flex items-center gap-3 w-full p-4 rounded-xl border-2 border-secondary/40 bg-secondary/5 hover:bg-secondary/10 text-left"
            >
              <FilePlus2 className="w-5 h-5 text-secondary flex-shrink-0" />
              <span className="font-bold text-foreground">
                Write a new entry for {getCountry(entryModal?.country_id || "")?.name} 📝
              </span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
