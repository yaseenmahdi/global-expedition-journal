import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useExplorations } from "@/hooks/useExplorations";
import { useStudentActivities, useActivities } from "@/hooks/useActivities";
import { getCountry } from "@/data/countries";

const XP_GOAL = 15;

export default function MyCountriesInProgress() {
  const navigate = useNavigate();
  const { data: explorations = [] } = useExplorations();
  const { data: allActs = [] } = useActivities();
  const { data: allCompleted = [] } = useStudentActivities();

  const inProgress = explorations.filter(e => e.status === "in_progress");
  const totalActs = allActs.length;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-slide-in">
      <button onClick={() => navigate("/")} className="btn-press flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <h1 className="text-3xl text-foreground mb-1">In Progress 🌀</h1>
      <p className="text-muted-foreground font-semibold mb-6">{inProgress.length} {inProgress.length === 1 ? "country" : "countries"} you're exploring right now</p>

      {inProgress.length === 0 ? (
        <div className="bg-muted/30 rounded-2xl border-2 border-dashed border-border p-12 text-center">
          <p className="text-4xl mb-2">🚀</p>
          <p className="font-semibold text-muted-foreground">No countries in progress — pick one from the Countries tab!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inProgress.map((exp: any) => {
            const country = getCountry(exp.country_id);
            if (!country) return null;
            const xp = exp.total_xp_earned || 0;
            const pct = Math.min(100, (xp / XP_GOAL) * 100);
            const doneCount = allCompleted.filter(c => c.country_id === country.id).length;
            return (
              <div key={exp.country_id} className="card-hover bg-card rounded-2xl border-2 border-secondary/40 p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-foreground truncate">{country.name}</h3>
                    <p className="text-xs text-muted-foreground font-semibold">{country.continent}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#14b8a6" }}>In Progress 🌀</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-1">
                  <span>{xp} XP earned</span>
                  <span>{doneCount} of {totalActs} activities done</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden mb-4">
                  <div className="h-full rounded-full bg-secondary transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <button
                  onClick={() => navigate(`/countries/${country.id}`)}
                  className="btn-press mt-auto w-full bg-secondary text-secondary-foreground font-bold py-2.5 rounded-xl text-sm hover:opacity-90"
                >
                  Continue Exploring 🌀
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
