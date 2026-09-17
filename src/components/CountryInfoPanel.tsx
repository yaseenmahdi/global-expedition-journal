import { useNavigate } from "react-router-dom";
import { getCountry } from "@/data/countries";
import { useStartExploration, type ExplorationRow } from "@/hooks/useExplorations";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const XP_GOAL = 15;

function FactCard({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="bg-muted rounded-2xl p-3 text-center">
      <p className="text-xl mb-1">{emoji}</p>
      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{label}</p>
      <p className="text-sm font-bold text-foreground mt-0.5 leading-tight">{value}</p>
    </div>
  );
}

export function CountryInfoPanel({ countryId, exploration }: {
  countryId: string | null;
  exploration?: ExplorationRow;
}) {
  const navigate = useNavigate();
  const startExploration = useStartExploration();
  const country = countryId ? getCountry(countryId) : null;
  const status = exploration?.status || "not_started";
  const { data: entries = [] } = useJournalEntries(status === "completed" && countryId ? countryId : undefined);
  const xpEarned = (exploration as any)?.total_xp_earned || 0;
  const xpPct = Math.min(100, (xpEarned / XP_GOAL) * 100);

  if (!country) {
    return (
      <div className="bg-card rounded-2xl border-2 border-border p-8 text-center">
        <p className="text-5xl mb-3">🧭</p>
        <p className="text-lg font-heading text-foreground">Click any country on the map to start exploring! 🌍</p>
        <p className="text-sm text-muted-foreground mt-1">Tap a country above to see fun facts and begin your adventure.</p>
      </div>
    );
  }

  const handleStart = async () => {
    try {
      await startExploration.mutateAsync(country.id);
      toast.success(`Started exploring ${country.name}! 🚀`);
      navigate(`/countries/${country.id}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to start exploration");
    }
  };

  const facts = [
    { emoji: "🗣️", label: "Language", value: country.language },
    { emoji: "👥", label: "Population", value: country.population },
    { emoji: "🍽️", label: "Famous Food", value: country.famousFood },
    { emoji: "🏰", label: "Landmark", value: country.famousLandmark },
    { emoji: "⭐", label: "Fun Fact", value: country.funFact },
  ];

  return (
    <div className="bg-card rounded-2xl border-2 border-border p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-5xl">{country.flag}</span>
        <div>
          <h2 className="text-2xl font-heading text-foreground">{country.name}</h2>
          <div className="flex gap-2 mt-1">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{country.continent}</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">🏛️ {country.capital}</span>
          </div>
        </div>
        {status === "completed" && (
          <span className="ml-auto px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold">Completed ✅</span>
        )}
      </div>

      {/* Fact cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
        {facts.map(f => <FactCard key={f.label} {...f} />)}
      </div>

      {/* In Progress XP bar */}
      {status === "in_progress" && exploration && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-foreground">XP Earned</span>
            <span className="text-sm font-heading text-primary">{xpEarned} / {XP_GOAL} XP ⭐</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${xpPct}%` }} />
          </div>
        </div>
      )}

      {/* Completed extras */}
      {status === "completed" && entries.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-foreground mb-2">Latest Journal Entry</p>
          <div className="bg-muted rounded-xl p-3">
            <p className="text-sm font-bold text-foreground truncate">{(entries[0] as any).title}</p>
            <p className="text-xs text-muted-foreground">{new Date((entries[0] as any).created_at).toLocaleDateString()}</p>
            {(entries[0] as any).tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {(entries[0] as any).tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/60 text-accent-foreground">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action button */}
      {status === "not_started" && (
        <Button onClick={handleStart} disabled={startExploration.isPending} className="w-full py-5 text-base font-bold rounded-xl bg-primary text-primary-foreground">
          {startExploration.isPending ? "Starting..." : "Start Exploring! 🚀"}
        </Button>
      )}
      {status === "in_progress" && (
        <Button onClick={() => navigate(`/countries/${country.id}`)} className="w-full py-5 text-base font-bold rounded-xl" style={{ background: "hsl(142 71% 45%)" }}>
          Continue Exploring 🌀
        </Button>
      )}
      {status === "completed" && (
        <Button onClick={() => navigate(`/countries/${country.id}`)} className="w-full py-5 text-base font-bold rounded-xl bg-primary text-primary-foreground">
          See My Work ✅
        </Button>
      )}
    </div>
  );
}
