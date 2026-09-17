import { useState } from "react";
import { countries, type ExplorationStatus } from "@/data/countries";
import { useNavigate } from "react-router-dom";
import { useExplorations } from "@/hooks/useExplorations";

type Filter = "all" | "completed" | "in_progress" | "not_started";

const filterTabs: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Completed ✅", value: "completed" },
  { label: "In Progress 🌀", value: "in_progress" },
  { label: "Not Explored 🔒", value: "not_started" },
];

const statusStyles: Record<string, { border: string; label: string; badge: string; bar: string }> = {
  completed: { border: "border-primary", label: "✅ Completed!", badge: "bg-primary text-primary-foreground", bar: "bg-primary" },
  in_progress: { border: "border-secondary border-dashed", label: "🌀 In Progress", badge: "bg-secondary text-secondary-foreground", bar: "bg-secondary" },
  not_started: { border: "border-border", label: "🔒 Not yet explored", badge: "bg-muted text-muted-foreground", bar: "bg-muted" },
};

export default function Countries() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: explorations = [] } = useExplorations();

  const getExploration = (countryId: string) => explorations.find(e => e.country_id === countryId);

  const filtered = countries.filter(c => {
    const exp = getExploration(c.id);
    const status = exp?.status || "not_started";
    if (filter !== "all" && status !== filter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto animate-fade-slide-in">
      <h1 className="text-3xl text-foreground mb-6">Countries 🌎</h1>

      <input
        type="text"
        placeholder="🔍 Search countries..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md bg-card border-2 border-border rounded-xl px-4 py-3 font-semibold text-foreground placeholder:text-muted-foreground mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {filterTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`btn-press text-sm font-bold px-4 py-2 rounded-xl transition-all ${
              filter === tab.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(country => {
          const exp = getExploration(country.id);
          const status = exp?.status || "not_started";
          const style = statusStyles[status] || statusStyles.not_started;
          const progress = exp?.progress_pct || 0;

          return (
            <div
              key={country.id}
              onClick={() => navigate(`/countries/${country.id}`)}
              className={`card-hover cursor-pointer rounded-2xl border-2 ${style.border} bg-card overflow-hidden ${status === "not_started" ? "opacity-75" : ""}`}
            >
              <div className={`py-4 flex justify-center text-5xl ${status === "completed" ? "bg-primary/10" : status === "in_progress" ? "bg-secondary/10" : "bg-muted/30"}`}>
                {country.flag}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-base text-foreground">{country.name}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.badge}`}>{style.label}</span>
                </div>
                <p className="text-xs text-muted-foreground font-semibold mb-3">{country.continent} · {country.capital}</p>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full ${style.bar} transition-all duration-700`} style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
