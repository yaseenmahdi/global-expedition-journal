import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const presetColors = ["#3B82F6", "#22c55e", "#f97316", "#a855f7", "#ec4899", "#14b8a6"];

export default function TagsManager() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(presetColors[0]);

  const { data: globalTags = [] } = useQuery({
    queryKey: ["global_tags"],
    queryFn: async () => {
      const { data, error } = await supabase.from("custom_tags").select("*").eq("is_global", true);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: studentTags = [] } = useQuery({
    queryKey: ["student_tags"],
    queryFn: async () => {
      const { data, error } = await supabase.from("custom_tags").select("*").eq("is_global", false);
      if (error) throw error;
      return data || [];
    },
  });

  const addTag = useMutation({
    mutationFn: async () => {
      if (!user || !newName.trim()) throw new Error("Name required");
      const { error } = await supabase.from("custom_tags").insert({
        name: newName.trim(),
        color: newColor,
        is_global: true,
        created_by: user.id,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["global_tags"] });
      setNewName("");
      toast.success("Tag added! 🏷️");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const promoteTag = useMutation({
    mutationFn: async (tagId: string) => {
      const { error } = await supabase.from("custom_tags").update({ is_global: true } as any).eq("id", tagId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["global_tags"] });
      queryClient.invalidateQueries({ queryKey: ["student_tags"] });
      toast.success("Tag promoted to global! ✅");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto animate-fade-slide-in">
      <h1 className="text-3xl font-heading text-foreground mb-6">Tags Manager 🏷️</h1>

      {/* Add new tag */}
      <div className="bg-card rounded-2xl border-2 border-border p-5 mb-6">
        <h2 className="text-lg font-heading text-foreground mb-3">Add New Global Tag</h2>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Tag Name</label>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="e.g. Geography, Culture, Food..."
              className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm font-semibold text-foreground"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Color</label>
            <div className="flex gap-1.5">
              {presetColors.map(c => (
                <button
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={`w-8 h-8 rounded-full transition-transform ${newColor === c ? "ring-2 ring-offset-2 ring-foreground scale-110" : ""}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <Button onClick={() => addTag.mutate()} disabled={addTag.isPending || !newName.trim()}>
            <Plus className="w-4 h-4 mr-1" /> Add Tag
          </Button>
        </div>
      </div>

      {/* Global tags */}
      <div className="mb-6">
        <h2 className="text-lg font-heading text-foreground mb-3">Global Tags ({globalTags.length})</h2>
        <div className="flex flex-wrap gap-2">
          {globalTags.length === 0 && <p className="text-sm text-muted-foreground">No global tags yet. Add one above!</p>}
          {globalTags.map((tag: any) => (
            <span key={tag.id} className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: tag.color || "#3B82F6" }}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Student-created tags */}
      <div>
        <h2 className="text-lg font-heading text-foreground mb-3">Student-Created Tags ({studentTags.length})</h2>
        {studentTags.length === 0 ? (
          <p className="text-sm text-muted-foreground">No student-created tags yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {studentTags.map((tag: any) => (
              <span key={tag.id} className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border-2 border-border text-foreground">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color || "#3B82F6" }} />
                {tag.name}
                <button onClick={() => promoteTag.mutate(tag.id)} className="text-xs text-primary font-bold hover:underline ml-1" title="Promote to global">
                  ↑ Global
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
