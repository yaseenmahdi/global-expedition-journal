import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Activity {
  id: string;
  title: string;
  description: string | null;
  xp_value: number;
  tier: string; // 'both' | 'explorer'
  category: string | null;
  order_index: number | null;
}

export interface StudentActivityRow {
  id: string;
  student_id: string;
  country_id: string;
  activity_id: string;
  xp_earned: number;
  completed_at: string;
  notes: string | null;
}

export function useActivities() {
  const { profile } = useAuth();
  const tier = (profile as any)?.tier || "explorer";

  return useQuery({
    queryKey: ["activities", tier],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("order_index", { ascending: true });
      if (error) throw error;
      const all = (data || []) as Activity[];
      // Junior sees only 'both'. Explorer sees 'both' + 'explorer'.
      return tier === "junior" ? all.filter(a => a.tier === "both") : all;
    },
    enabled: !!profile,
  });
}

export function useStudentActivities(countryId?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["student_activities", user?.id, countryId],
    queryFn: async () => {
      if (!user) return [];
      let q = supabase
        .from("student_activities")
        .select("*")
        .eq("student_id", user.id);
      if (countryId) q = q.eq("country_id", countryId);
      const { data, error } = await q;
      if (error) throw error;
      return (data || []) as StudentActivityRow[];
    },
    enabled: !!user,
  });
}

export function useCompleteActivity() {
  const { user, refreshProfile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      activityId,
      countryId,
      xpValue,
      notes,
    }: {
      activityId: string;
      countryId: string;
      xpValue: number;
      notes?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("student_activities")
        .insert({
          student_id: user.id,
          country_id: countryId,
          activity_id: activityId,
          xp_earned: xpValue,
          notes: notes ?? null,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student_activities"] });
      queryClient.invalidateQueries({ queryKey: ["explorations"] });
      queryClient.invalidateQueries({ queryKey: ["exploration"] });
      queryClient.invalidateQueries({ queryKey: ["xp_ledger"] });
      refreshProfile();
    },
  });
}

/**
 * Award an activity by its title if the student hasn't completed it yet
 * for the given country. Used for auto-checking on journal save / photo / quiz.
 */
export async function awardActivityByTitle(opts: {
  userId: string;
  countryId: string;
  title: string;
}): Promise<{ awarded: boolean; xp?: number; title?: string }> {
  const { userId, countryId, title } = opts;

  const { data: act, error: actErr } = await supabase
    .from("activities")
    .select("id, title, xp_value")
    .eq("title", title)
    .maybeSingle();
  if (actErr || !act) return { awarded: false };

  const { data: existing } = await supabase
    .from("student_activities")
    .select("id")
    .eq("student_id", userId)
    .eq("country_id", countryId)
    .eq("activity_id", act.id)
    .maybeSingle();

  if (existing) return { awarded: false };

  const { error: insErr } = await supabase.from("student_activities").insert({
    student_id: userId,
    country_id: countryId,
    activity_id: act.id,
    xp_earned: act.xp_value,
    notes: "auto_awarded",
  });
  if (insErr) return { awarded: false };

  return { awarded: true, xp: act.xp_value, title: act.title };
}
