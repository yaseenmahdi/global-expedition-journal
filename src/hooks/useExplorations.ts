import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ExplorationRow {
  id: string;
  student_id: string;
  country_id: string;
  status: string;
  progress_pct: number;
  checklist: {
    journal_written: boolean;
    tags_added: boolean;
    facts_learned: boolean;
    photo_added: boolean;
    quiz_done: boolean;
  };
  started_at: string | null;
  completed_at: string | null;
}

export function useExplorations() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["explorations", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("explorations")
        .select("*")
        .eq("student_id", user.id);
      if (error) throw error;
      return (data || []) as unknown as ExplorationRow[];
    },
    enabled: !!user,
  });
}

export function useExploration(countryId: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["exploration", user?.id, countryId],
    queryFn: async () => {
      if (!user || !countryId) return null;
      const { data, error } = await supabase
        .from("explorations")
        .select("*")
        .eq("student_id", user.id)
        .eq("country_id", countryId)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as ExplorationRow | null;
    },
    enabled: !!user && !!countryId,
  });
}

export function useStartExploration() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (countryId: string) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("explorations")
        .insert({
          student_id: user.id,
          country_id: countryId,
          status: "in_progress",
          progress_pct: 0,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["explorations"] });
      queryClient.invalidateQueries({ queryKey: ["exploration"] });
    },
  });
}

export function useUpdateExploration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ExplorationRow> & { id: string }) => {
      const { data, error } = await supabase
        .from("explorations")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["explorations"] });
      queryClient.invalidateQueries({ queryKey: ["exploration"] });
    },
  });
}
