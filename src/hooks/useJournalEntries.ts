import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useJournalEntries(countryId?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["journal_entries", user?.id, countryId],
    queryFn: async () => {
      if (!user) return [];
      let query = supabase
        .from("journal_entries")
        .select("*")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

      if (countryId) {
        query = query.eq("country_id", countryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

export function useSaveJournalEntry() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: {
      country_id: string;
      title: string;
      content: string;
      tags: string[];
      word_count: number;
    }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("journal_entries")
        .insert({
          student_id: user.id,
          ...entry,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal_entries"] });
      queryClient.invalidateQueries({ queryKey: ["explorations"] });
      queryClient.invalidateQueries({ queryKey: ["exploration"] });
    },
  });
}

export function useUpdateJournalEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; content?: string; tags?: string[]; word_count?: number }) => {
      const { data, error } = await supabase
        .from("journal_entries")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal_entries"] });
    },
  });
}
