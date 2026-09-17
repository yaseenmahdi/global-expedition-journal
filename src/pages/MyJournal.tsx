import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { getCountry } from "@/data/countries";

export default function MyJournal() {
  const navigate = useNavigate();
  const { data: entries = [] } = useJournalEntries();

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto animate-fade-slide-in">
      <button onClick={() => navigate("/")} className="btn-press flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <h1 className="text-3xl text-foreground mb-1">My Journal 📓</h1>
      <p className="text-muted-foreground font-semibold mb-6">{entries.length} {entries.length === 1 ? "entry" : "entries"} · most recent first</p>

      {entries.length === 0 ? (
        <div className="bg-muted/30 rounded-2xl border-2 border-dashed border-border p-12 text-center">
          <p className="text-4xl mb-2">✍️</p>
          <p className="font-semibold text-muted-foreground">No journal entries yet — write your first one!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry: any) => {
            const country = getCountry(entry.country_id);
            const lines = (entry.content || "").split("\n").slice(0, 2).join(" ");
            return (
              <div key={entry.id} className="card-hover bg-card rounded-2xl border-2 border-border p-5 flex gap-4">
                <span className="text-3xl flex-shrink-0">{country?.flag || "🌍"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground font-semibold">
                      {new Date(entry.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground font-semibold">{country?.name}</span>
                  </div>
                  <h3 className="font-heading text-base text-foreground mb-1">{entry.title || "Untitled"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{lines}</p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {(entry.tags || []).map((tag: string) => (
                        <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/60 text-accent-foreground">{tag}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate("/journal", { state: { editEntryId: entry.id, countryId: entry.country_id } })}
                      className="btn-press flex-shrink-0 flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </button>
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
