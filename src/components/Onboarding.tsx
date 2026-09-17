import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Step {
  emoji: string;
  title: string;
  body: string;
  cta?: { label: string; path: string };
}

const steps: Step[] = [
  {
    emoji: "🗺️",
    title: "Explore the World Map",
    body: "Spin the globe and tap any country to start an adventure!",
    cta: { label: "Open the Map", path: "/map" },
  },
  {
    emoji: "🌎",
    title: "Pick a Country",
    body: "Browse all the countries, learn fun facts, and start collecting research XP.",
    cta: { label: "Browse Countries", path: "/countries" },
  },
  {
    emoji: "📓",
    title: "Write in Your Journal",
    body: "Save your favorite discoveries — your teacher can read and cheer you on!",
    cta: { label: "Open Journal", path: "/journal" },
  },
  {
    emoji: "📖",
    title: "Earn Passport Stamps",
    body: "Complete activities to earn a stamp for every country you explore!",
    cta: { label: "See Passport", path: "/passport" },
  },
];

export function Onboarding() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);

  // Show only when profile is loaded and onboarding hasn't been seen.
  useEffect(() => {
    if (!user || !profile) return;
    const seen = (profile as any)?.has_seen_onboarding;
    if (seen === false || seen === null || seen === undefined) {
      setOpen(true);
      setStepIdx(0);
    }
  }, [user?.id, (profile as any)?.has_seen_onboarding]);

  const finish = async (goTo?: string) => {
    setOpen(false);
    if (user) {
      await supabase
        .from("profiles")
        .update({ has_seen_onboarding: true } as any)
        .eq("id", user.id);
      await refreshProfile();
    }
    if (goTo) navigate(goTo);
  };

  if (!open) return null;

  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-slide-in"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome tour"
    >
      <div className="w-full max-w-md bg-card rounded-3xl border-4 border-primary p-6 shadow-2xl">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === stepIdx ? "bg-primary w-6" : "bg-muted w-2"
              }`}
            />
          ))}
        </div>

        <div className="text-center">
          <div className="text-6xl mb-3">{step.emoji}</div>
          <h2 className="font-heading text-2xl text-foreground mb-2">{step.title}</h2>
          <p className="text-muted-foreground font-semibold mb-6">{step.body}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              if (isLast) {
                finish(step.cta?.path);
              } else {
                setStepIdx(i => i + 1);
              }
            }}
            className="btn-bubble w-full py-4 bg-primary text-primary-foreground text-base"
          >
            {isLast ? `Let's go! ${step.cta ? "→" : ""} 🚀` : "Next →"}
          </button>

          {!isLast && (
            <button
              onClick={() => finish()}
              className="btn-bubble w-full py-2.5 bg-muted text-muted-foreground text-sm"
            >
              Skip tour
            </button>
          )}
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-4 font-semibold">
          Step {stepIdx + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
