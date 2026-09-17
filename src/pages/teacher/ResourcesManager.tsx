import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const DEFAULT_RESOURCES = [
  { key: "wikipedia", emoji: "🌐", name: "Simple Wikipedia", description: "Easy-to-read country articles" },
  { key: "natgeo", emoji: "🌍", name: "National Geographic", description: "Amazing photos and facts about our world" },
  { key: "natgeo_history", emoji: "📜", name: "Nat Geo History", description: "History and ancient civilizations" },
  { key: "bbc_travel", emoji: "✈️", name: "BBC Travel", description: "Stories and guides from around the world" },
  { key: "google_maps", emoji: "🗺️", name: "Google Maps", description: "Explore countries on the map" },
  { key: "google_video", emoji: "🎥", name: "Google Video Search", description: "Search for kid-friendly videos" },
  { key: "google_search", emoji: "🔍", name: "Google Search for Kids", description: "Pre-filled kid-friendly search" },
];

export default function ResourcesManager() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newEmoji, setNewEmoji] = useState("🔗");
  const [newDesc, setNewDesc] = useState("");

  const { data: resources = [] } = useQuery({
    queryKey: ["teacher_resources", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("teacher_resources").select("*").eq("teacher_id", user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const validKeys = new Set(DEFAULT_RESOURCES.map(d => d.key));

  // Sync default resources: insert missing, delete stale
  const syncDefaults = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const existing = resources.map((r: any) => r.resource_key);
      // Delete stale default resources (non-custom keys not in current defaults)
      const staleIds = (resources as any[])
        .filter((r: any) => !r.resource_key.startsWith("custom_") && !validKeys.has(r.resource_key))
        .map((r: any) => r.id);
      for (const id of staleIds) {
        await supabase.from("teacher_resources").delete().eq("id", id);
      }
      // Insert missing defaults
      const toInsert = DEFAULT_RESOURCES.filter(d => !existing.includes(d.key)).map(d => ({
        teacher_id: user.id,
        resource_key: d.key,
        name: d.name,
        emoji: d.emoji,
        description: d.description,
        url: "",
        visible: true,
      }));
      if (toInsert.length > 0) {
        const { error } = await supabase.from("teacher_resources").insert(toInsert as any);
        if (error) throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teacher_resources"] }),
  });

  // Auto-sync defaults
  const hasStale = (resources as any[]).some((r: any) => !r.resource_key.startsWith("custom_") && !validKeys.has(r.resource_key));
  const hasMissing = DEFAULT_RESOURCES.some(d => !(resources as any[]).find((r: any) => r.resource_key === d.key));
  if (user && resources.length > 0 && (hasStale || hasMissing) && !syncDefaults.isPending) {
    syncDefaults.mutate();
  }
  if (user && resources.length === 0 && !syncDefaults.isPending) {
    syncDefaults.mutate();
  }

  const toggleVisibility = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const { error } = await supabase.from("teacher_resources").update({ visible } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teacher_resources"] }),
  });

  const addCustom = useMutation({
    mutationFn: async () => {
      if (!user || !newName.trim() || !newUrl.trim()) throw new Error("Name and URL required");
      const { error } = await supabase.from("teacher_resources").insert({
        teacher_id: user.id,
        resource_key: `custom_${Date.now()}`,
        name: newName.trim(),
        url: newUrl.trim(),
        emoji: newEmoji || "🔗",
        description: newDesc.trim(),
        visible: true,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher_resources"] });
      setNewName(""); setNewUrl(""); setNewEmoji("🔗"); setNewDesc("");
      toast.success("Resource added! 🌍");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteResource = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("teacher_resources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher_resources"] });
      toast.success("Resource removed");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const defaultResources = resources.filter((r: any) => !r.resource_key.startsWith("custom_"));
  const customResources = resources.filter((r: any) => r.resource_key.startsWith("custom_"));

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto animate-fade-slide-in">
      <h1 className="text-3xl font-heading text-foreground mb-2">Resources Manager 🌍</h1>
      <p className="text-sm text-muted-foreground font-semibold mb-6">
        All student-facing resources open in a new tab. Remind students to always ask a grown-up before browsing! 🙋
      </p>

      {/* Default resources */}
      <div className="mb-6">
        <h2 className="text-lg font-heading text-foreground mb-3">Default Resources</h2>
        <div className="flex flex-col gap-2">
          {defaultResources.map((r: any) => (
            <div key={r.id} className="bg-card rounded-xl border-2 border-border p-4 flex items-center gap-3">
              <span className="text-2xl">{r.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={r.visible}
                  onChange={() => toggleVisibility.mutate({ id: r.id, visible: !r.visible })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Custom resources */}
      <div className="mb-6">
        <h2 className="text-lg font-heading text-foreground mb-3">Custom Resources</h2>
        {customResources.length === 0 ? (
          <p className="text-sm text-muted-foreground mb-3">No custom resources added yet.</p>
        ) : (
          <div className="flex flex-col gap-2 mb-3">
            {customResources.map((r: any) => (
              <div key={r.id} className="bg-card rounded-xl border-2 border-border p-4 flex items-center gap-3">
                <span className="text-2xl">{r.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                  <p className="text-[10px] text-primary truncate">{r.url}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mr-2">
                  <input
                    type="checkbox"
                    checked={r.visible}
                    onChange={() => toggleVisibility.mutate({ id: r.id, visible: !r.visible })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
                <button onClick={() => deleteResource.mutate(r.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add custom */}
      <div className="bg-card rounded-2xl border-2 border-border p-5">
        <h2 className="text-lg font-heading text-foreground mb-3">Add Custom Resource</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Resource Name</label>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. World Book Online" className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm font-semibold text-foreground" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">URL</label>
            <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="https://..." className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm font-semibold text-foreground" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Emoji Icon</label>
            <input value={newEmoji} onChange={e => setNewEmoji(e.target.value)} placeholder="🔗" className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm font-semibold text-foreground" maxLength={4} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Description</label>
            <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Short description..." className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm font-semibold text-foreground" />
          </div>
        </div>
        <Button onClick={() => addCustom.mutate()} disabled={addCustom.isPending || !newName.trim() || !newUrl.trim()}>
          <Plus className="w-4 h-4 mr-1" /> Add Resource
        </Button>
      </div>
    </div>
  );
}
