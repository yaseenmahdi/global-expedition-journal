import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useExplorations } from "@/hooks/useExplorations";
import { getCountry } from "@/data/countries";

export default function MyCountriesCompleted() {
  const navigate = useNavigate();
  const { data: explorations = [] } = useExplorations();
  const completed = explorations
    .filter(e => e.status === "completed")
    .sort((a: any, b: any) => (b.completed_at || "").localeCompare(a.completed_at || ""));

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-slide-in">
      <button onClick={() => navigate("/")} className="btn-press flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <h1 className="text-3xl text-foreground mb-1">Countries Explored 🌍</h1>
      <p className="text-muted-foreground font-semibold mb-6">{completed.length} {completed.length === 1 ? "country" : "countries"} completed</p>

      {completed.length === 0 ? (
        <div className="bg-muted/30 rounded-2xl border-2 border-dashed border-border p-12 text-center">
          <p className="text-4xl mb-2">🌱</p>
          <p className="font-semibold text-muted-foreground">No completed countries yet — keep exploring!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completed.map((exp: any) => {
            const country = getCountry(exp.country_id);
            if (!country) return null;
            return (
              <div key={exp.country_id} className="card-hover bg-card rounded-2xl border-2 border-primary/40 p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-foreground truncate">{country.name}</h3>
                    <p className="text-xs text-muted-foreground font-semibold">{country.continent}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">Done ✅</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground mb-4">
                  <span>⭐ {exp.total_xp_earned || 0} XP</span>
                  {exp.completed_at && <span>· {new Date(exp.completed_at).toLocaleDateString()}</span>}
                </div>
                <button
                  onClick={() => navigate(`/countries/${country.id}`)}
                  className="btn-press mt-auto w-full bg-primary text-primary-foreground font-bold py-2.5 rounded-xl text-sm hover:opacity-90"
                >
                  View My Work →
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
