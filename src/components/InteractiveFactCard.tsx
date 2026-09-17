import { useState, useEffect } from "react";
import { Pencil, Check } from "lucide-react";
import { useSaveResearch, type CountryResearchRow } from "@/hooks/useCountryResearch";
import { showXpFloat } from "@/components/XpFloater";
import { toast } from "sonner";

interface Props {
  countryId: string;
  factType: string; // 'language' | 'population' | ...
  emoji: string;
  label: string;
  value: string;
  prompt: string;
  existing?: CountryResearchRow;
  xpAvailable: boolean; // false once 5 XP cap reached
}

export function InteractiveFactCard({
  countryId,
  factType,
  emoji,
  label,
  value,
  prompt,
  existing,
  xpAvailable,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(existing?.response || "");
  const saveMut = useSaveResearch();
  const isSaved = !!existing;

  useEffect(() => {
    setDraft(existing?.response || "");
  }, [existing?.id, existing?.response]);

  const handleSave = async () => {
    const text = draft.trim();
    if (!text) {
      toast.error("Write a little bit before saving! ✍️");
      return;
    }
    try {
      const wasNew = !existing;
      await saveMut.mutateAsync({
        countryId,
        factType,
        response: text,
        existingId: existing?.id,
      });
      setEditing(false);
      if (wasNew && xpAvailable) {
        showXpFloat(1);
        toast.success("Research saved! +1 XP ⭐");
      } else if (wasNew) {
        toast.success("Research saved! 🎉 (XP cap reached for this country)");
      } else {
        toast.success("Research updated! ✏️");
      }
    } catch (err: any) {
      toast.error(err.message || "Couldn't save research");
    }
  };

  return (
    <div
      className={`card-hover bg-card rounded-2xl border-2 transition-all overflow-hidden ${
        isSaved ? "border-primary/40" : "border-border"
      }`}
    >
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-2xl"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-2">
          <span className="text-xl flex-shrink-0">{emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{label}</p>
              {isSaved && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground" title="Research saved">
                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                </span>
              )}
            </div>
            <p className="text-sm font-bold text-foreground mt-0.5 leading-tight">{value}</p>
            <p className="text-[10px] text-muted-foreground font-semibold mt-1">
              {expanded ? "Click to close" : isSaved ? "Tap to view your research" : "Tap to research ✨"}
            </p>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 -mt-1 flex flex-col gap-2 border-t border-border pt-3 mt-2">
          <p className="text-xs font-semibold text-foreground italic leading-relaxed">{prompt}</p>

          {isSaved && !editing ? (
            <>
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-3">
                <p className="text-sm text-foreground whitespace-pre-wrap">{existing!.response}</p>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="btn-press self-start inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
              >
                <Pencil className="w-3 h-3" /> Edit
              </button>
            </>
          ) : (
            <>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Type your research here..."
                rows={3}
                className="w-full text-sm bg-background border-2 border-border rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/50"
              />
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] text-muted-foreground font-semibold">
                  {!isSaved && xpAvailable && "+1 XP when you save ⭐"}
                  {!isSaved && !xpAvailable && "XP cap reached — your research still saves! ✨"}
                </p>
                <div className="flex gap-2">
                  {editing && (
                    <button
                      onClick={() => { setEditing(false); setDraft(existing?.response || ""); }}
                      className="btn-press text-xs font-bold px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={handleSave}
                    disabled={saveMut.isPending}
                    className="btn-press text-xs font-bold px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
                  >
                    {saveMut.isPending ? "Saving..." : "Save my research ✅"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
