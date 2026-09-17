import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { getCountry } from "@/data/countries";

interface LedgerRow {
  id: string;
  country_id: string | null;
  activity_id: string | null;
  xp_amount: number;
  reason: string | null;
  earned_at: string;
}

export default function XpLedger() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const { data: rows = [] } = useQuery({
    queryKey: ["xp_ledger", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const [{ data: ledger }, { data: acts }] = await Promise.all([
        supabase.from("xp_ledger").select("*").eq("student_id", user.id).order("earned_at", { ascending: false }),
        supabase.from("activities").select("id, title"),
      ]);
      const titleMap = new Map((acts || []).map(a => [a.id, a.title]));
      return ((ledger as LedgerRow[]) || []).map(r => ({
        ...r,
        activity_title: r.activity_id ? titleMap.get(r.activity_id) || "Activity" : (r.reason || "XP earned"),
      }));
    },
    enabled: !!user,
  });

  const total = (profile as any)?.total_xp ?? profile?.xp_points ?? 0;

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto animate-fade-slide-in">
      <button onClick={() => navigate("/")} className="btn-press flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <h1 className="text-3xl text-foreground mb-1">XP History ⭐</h1>
      <p className="text-muted-foreground font-semibold mb-6">Every adventure point you've earned!</p>

      {/* Running total card */}
      <div className="rounded-2xl border-2 border-orange/40 bg-orange/5 p-6 mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Total XP</p>
          <p className="text-4xl font-heading text-foreground mt-1">{total} ⭐</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Events</p>
          <p className="text-2xl font-heading text-foreground mt-1">{rows.length}</p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="bg-muted/30 rounded-2xl border-2 border-dashed border-border p-12 text-center">
          <p className="text-4xl mb-2">📜</p>
          <p className="font-semibold text-muted-foreground">No XP yet — complete an activity to start your log!</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto] gap-3 px-5 py-3 bg-muted/40 text-xs font-bold uppercase tracking-wide text-muted-foreground border-b-2 border-border">
            <span>Date</span>
            <span>Activity</span>
            <span>XP</span>
          </div>
          <div className="divide-y divide-border">
            {rows.map((r: any) => {
              const country = r.country_id ? getCountry(r.country_id) : null;
              return (
                <div key={r.id} className="grid grid-cols-[auto_1fr_auto] gap-3 px-5 py-3 items-center hover:bg-muted/20 transition-colors">
                  <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    {new Date(r.earned_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </span>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl flex-shrink-0">{country?.flag || "🌟"}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{r.activity_title}</p>
                      {country && <p className="text-xs text-muted-foreground font-semibold">{country.name}</p>}
                    </div>
                  </div>
                  <span className="text-sm font-bold px-2.5 py-1 rounded-full bg-orange/20 text-orange whitespace-nowrap">+{r.xp_amount} XP</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
