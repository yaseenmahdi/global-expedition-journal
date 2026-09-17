import { useNavigate } from "react-router-dom";
import { countries } from "@/data/countries";
import { useExplorations } from "@/hooks/useExplorations";
import { useAuth } from "@/contexts/AuthContext";

export default function Passport() {
  const { data: explorations = [] } = useExplorations();
  const { profile } = useAuth();
  const navigate = useNavigate();

  const getExploration = (countryId: string) => explorations.find(e => e.country_id === countryId);
  const completedCount = explorations.filter(e => e.status === "completed").length;

  const goToCountry = (countryId: string) => navigate(`/countries/${countryId}`);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-slide-in">
      <h1 className="text-3xl text-foreground mb-2">My Passport 📖</h1>
      <p className="text-muted-foreground font-semibold mb-6">
        Tap any stamp to visit that country!
      </p>

      <div className="bg-navy rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <p className="font-heading text-gold text-2xl tracking-wider">GLOBAL EXPEDITION JOURNAL</p>
          <p className="text-blue/60 font-semibold text-sm mt-1">Explorer's Passport</p>
          <p className="text-blue/40 font-semibold text-xs mt-3">
            {profile?.name || "Explorer"} • Level {Math.floor(completedCount / 3) + 1}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {countries.map((country) => {
            const exp = getExploration(country.id);
            const status = exp?.status || "not_started";

            // EARNED — completed stamp
            if (status === "completed") {
              return (
                <button
                  key={country.id}
                  onClick={() => goToCountry(country.id)}
                  aria-label={`View ${country.name} (completed)`}
                  className="card-hover animate-stamp-bounce flex flex-col items-center gap-1 bg-card/95 rounded-2xl border-2 border-primary p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <span className="text-3xl">{country.flag}</span>
                  <span className="font-heading text-xs text-primary text-center leading-tight">{country.name}</span>
                </button>
              );
            }

            // SHIMMERING — in progress (with pulse)
            if (status === "in_progress") {
              return (
                <button
                  key={country.id}
                  onClick={() => goToCountry(country.id)}
                  aria-label={`View ${country.name} (in progress)`}
                  className="card-hover animate-stamp-pulse flex flex-col items-center gap-1 bg-card/20 rounded-2xl border-2 border-dashed border-secondary p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <span className="text-3xl opacity-80">{country.flag}</span>
                  <span className="font-heading text-xs text-secondary text-center leading-tight">{country.name}</span>
                </button>
              );
            }

            // LOCKED — not yet started
            return (
              <button
                key={country.id}
                onClick={() => goToCountry(country.id)}
                aria-label={`Start exploring ${country.name}`}
                className="card-hover flex flex-col items-center gap-1 bg-card/5 rounded-2xl border-2 border-dashed border-muted-foreground/20 p-3 focus:outline-none focus:ring-2 focus:ring-muted-foreground/40"
              >
                <span className="text-3xl opacity-30 grayscale">{country.flag}</span>
                <span className="font-heading text-xs text-muted-foreground/40 text-center leading-tight">?</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
