import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface CountryResearchRow {
  id: string;
  student_id: string;
  country_id: string;
  fact_type: string;
  response: string;
  saved_at: string;
  updated_at: string;
}

export const RESEARCH_XP_CAP = 5;

export function useCountryResearch(countryId?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["country_research", user?.id, countryId],
    queryFn: async () => {
      if (!user || !countryId) return [];
      const { data, error } = await supabase
        .from("country_research")
        .select("*")
        .eq("student_id", user.id)
        .eq("country_id", countryId);
      if (error) throw error;
      return (data || []) as CountryResearchRow[];
    },
    enabled: !!user && !!countryId,
  });
}

export function useSaveResearch() {
  const { user, refreshProfile } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      countryId,
      factType,
      response,
      existingId,
    }: {
      countryId: string;
      factType: string;
      response: string;
      existingId?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");
      if (existingId) {
        const { data, error } = await supabase
          .from("country_research")
          .update({ response })
          .eq("id", existingId)
          .select()
          .single();
        if (error) throw error;
        return { row: data, isNew: false };
      }
      const { data, error } = await supabase
        .from("country_research")
        .insert({
          student_id: user.id,
          country_id: countryId,
          fact_type: factType,
          response,
        })
        .select()
        .single();
      if (error) throw error;
      return { row: data, isNew: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["country_research"] });
      queryClient.invalidateQueries({ queryKey: ["explorations"] });
      queryClient.invalidateQueries({ queryKey: ["exploration"] });
      queryClient.invalidateQueries({ queryKey: ["xp_ledger"] });
      refreshProfile();
    },
  });
}
