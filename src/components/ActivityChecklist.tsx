import { useState } from "react";
import { useActivities, useStudentActivities, useCompleteActivity, type Activity } from "@/hooks/useActivities";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { showXpFloat } from "./XpFloater";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const categoryEmoji: Record<string, string> = {
  creative: "🎨",
  research: "🔍",
  cultural: "🌍",
  tech: "💻",
  food: "🍽️",
  language: "🗣️",
  geography: "🗺️",
};

function emojiFor(a: Activity): string {
  if (a.category && categoryEmoji[a.category]) return categoryEmoji[a.category];
  return "⭐";
}

interface Props {
  countryId: string;
  countryName: string;
  totalXp: number;
}

const XP_GOAL = 15;

export function ActivityChecklist({ countryId, countryName, totalXp }: Props) {
  const { data: activities = [] } = useActivities();
  const { data: completed = [] } = useStudentActivities(countryId);
  const completeMutation = useCompleteActivity();
  const [pending, setPending] = useState<Activity | null>(null);

  const completedIds = new Set(completed.map(c => c.activity_id));
  const sharedActs = activities.filter(a => a.tier === "both");
  const explorerActs = activities.filter(a => a.tier === "explorer");

  const handleConfirm = async () => {
    if (!pending) return;
    const act = pending;
    setPending(null);
    try {
      const wasCompleted = totalXp >= XP_GOAL;
      await completeMutation.mutateAsync({
        activityId: act.id,
        countryId,
        xpValue: act.xp_value,
      });
      showXpFloat(act.xp_value);
      // Check if this completes the country
      const newTotal = totalXp + act.xp_value;
      if (!wasCompleted && newTotal >= XP_GOAL) {
        confetti({ particleCount: 180, spread: 90, origin: { y: 0.6 } });
        toast.success(`🎉 Country Complete! ${countryName} passport stamp earned!`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to record activity");
    }
  };

  const renderCard = (a: Activity, isExplorer = false) => {
    const done = completedIds.has(a.id);
    const borderClass = done
      ? "border-primary bg-primary/10"
      : isExplorer
        ? "border-secondary/50 bg-card hover:border-secondary"
        : "border-border bg-card hover:border-primary/50";
    return (
      <button
        key={a.id}
        onClick={() => !done && setPending(a)}
        disabled={done || completeMutation.isPending}
        className={`w-full text-left flex items-center gap-3 rounded-xl border-2 p-3 transition-all ${borderClass} ${done ? "cursor-default" : "btn-press"}`}
      >
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center text-xs ${
            done ? "bg-primary border-primary text-primary-foreground" : "border-border bg-background"
          }`}
        >
          {done && "✓"}
        </span>
        <span className="text-xl flex-shrink-0">{emojiFor(a)}</span>
        <span className={`flex-1 text-sm font-semibold ${done ? "text-foreground/80 line-through" : "text-foreground"}`}>
          {a.title}
        </span>
        <span
          className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
            done ? "bg-primary text-primary-foreground" : isExplorer ? "bg-secondary/20 text-secondary" : "bg-accent text-accent-foreground"
          }`}
        >
          +{a.xp_value} XP
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Shared activities */}
      <section className="bg-card rounded-2xl border-2 border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-heading text-foreground">Activities 🌟</h2>
          <span className="text-xs font-bold text-muted-foreground">
            {sharedActs.filter(a => completedIds.has(a.id)).length} / {sharedActs.length} done
          </span>
        </div>
        <div className="flex flex-col gap-2">{sharedActs.map(a => renderCard(a))}</div>
      </section>

      {/* Explorer challenges */}
      {explorerActs.length > 0 && (
        <section className="bg-card rounded-2xl border-2 border-secondary p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-heading text-secondary">Explorer Challenges 🚀</h2>
            <span className="text-xs font-bold text-muted-foreground">
              {explorerActs.filter(a => completedIds.has(a.id)).length} / {explorerActs.length} done
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Advanced activities for Global Ex Kids Explorers!</p>
          <div className="flex flex-col gap-2">{explorerActs.map(a => renderCard(a, true))}</div>
        </section>
      )}

      {/* Confirm dialog */}
      <Dialog open={!!pending} onOpenChange={open => !open && setPending(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg flex items-center gap-2">
              {pending && <span className="text-2xl">{emojiFor(pending)}</span>}
              {pending?.title}
            </DialogTitle>
            <DialogDescription>
              {pending && `Did you complete this activity? You'll earn +${pending.xp_value} XP! 🌟`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setPending(null)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={completeMutation.isPending} className="font-bold">
              Yes, I did it! ✅
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
