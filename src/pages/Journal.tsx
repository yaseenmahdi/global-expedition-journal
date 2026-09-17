import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { countries, defaultTags, getCountry } from "@/data/countries";
import { useJournalEntries, useSaveJournalEntry, useUpdateJournalEntry } from "@/hooks/useJournalEntries";
import { awardActivityByTitle } from "@/hooks/useActivities";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { showXpFloat } from "@/components/XpFloater";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";
import { toast } from "sonner";

const prompts = [
  "What surprised you most about [country]'s food?",
  "If you could visit [country] for one day, what would you do first?",
  "What is one tradition from [country] you'd love to try?",
  "Describe what the landscape looks like in [country].",
  "What language do people speak in [country] and can you learn to say hello?",
  "What is one thing you and kids from [country] have in common?",
  "Draw or describe the flag of [country]. What do the colors mean?",
];

const tagColors: Record<string, string> = {
  orange: "bg-orange/20 text-orange border-orange/30",
  blue: "bg-blue/20 text-blue border-blue/30",
  purple: "bg-purple/20 text-purple border-purple/30",
  primary: "bg-primary/20 text-primary border-primary/30",
  secondary: "bg-secondary/20 text-secondary border-secondary/30",
  gold: "bg-accent/40 text-accent-foreground border-accent/50",
  pink: "bg-pink/20 text-pink border-pink/30",
};

export default function Journal() {
  const location = useLocation();
  const navigate = useNavigate();
  const navState = (location.state || {}) as { editEntryId?: string; countryId?: string; newForCountry?: string };

  const [selectedCountry, setSelectedCountry] = useState(
    navState.countryId || navState.newForCountry || countries[0].id
  );
  const [promptIdx, setPromptIdx] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const country = getCountry(selectedCountry)!;
  const prompt = prompts[promptIdx].replace("[country]", country.name);
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const { data: countryEntries = [] } = useJournalEntries(selectedCountry);
  const saveEntry = useSaveJournalEntry();
  const updateEntry = useUpdateJournalEntry();

  const { user, refreshProfile } = useAuth();
  const queryClient = useQueryClient();

  // Pre-load entry for editing when arriving via route state
  useEffect(() => {
    if (navState.editEntryId && countryEntries.length > 0) {
      const entry = countryEntries.find((e: any) => e.id === navState.editEntryId);
      if (entry && editingId !== entry.id) {
        setEditingId(entry.id);
        setTitle(entry.title || "");
        setContent(entry.content || "");
        setSelectedTags(entry.tags || []);
        setPhotoUrl(entry.photo_url || null);
      }
    }
    if (navState.editEntryId || navState.newForCountry) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryEntries.length]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const newPrompt = () => setPromptIdx((promptIdx + 1) % prompts.length);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setSelectedTags([]);
    setPhotoUrl(null);
  };

  const handleFileUpload = async (file: File) => {
    if (!user) { toast.error("Please sign in"); return; }
    if (!file.type.startsWith("image/")) { toast.error("Please upload an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("journal-photos").upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("journal-photos").getPublicUrl(path);
      setPhotoUrl(data.publicUrl);
      toast.success("Photo added! 📸");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please add a title and some content! ✍️");
      return;
    }
    try {
      if (editingId) {
        await updateEntry.mutateAsync({
          id: editingId,
          title,
          content,
          tags: selectedTags,
          word_count: wordCount,
          photo_url: photoUrl,
        } as any);
        toast.success("Entry updated! ✏️");
        resetForm();
        return;
      }

      await saveEntry.mutateAsync({
        country_id: selectedCountry,
        title,
        content,
        tags: selectedTags,
        word_count: wordCount,
        photo_url: photoUrl,
      } as any);
      toast.success("Journal entry saved! ✈️");

      if (user) {
        const res = await awardActivityByTitle({
          userId: user.id,
          countryId: selectedCountry,
          title: "Read for 10 minutes about this country",
        });
        if (res.awarded && res.xp) {
          showXpFloat(res.xp);
          queryClient.invalidateQueries({ queryKey: ["student_activities"] });
          queryClient.invalidateQueries({ queryKey: ["explorations"] });
          queryClient.invalidateQueries({ queryKey: ["exploration"] });
          refreshProfile();
        }
      }

      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Failed to save entry");
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto animate-fade-slide-in">
      <h1 className="text-3xl text-foreground mb-6">My Journal 📓</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 flex flex-col gap-5">
          {editingId && (
            <div className="flex items-center justify-between bg-primary/10 border-2 border-primary/40 rounded-xl px-4 py-2.5">
              <span className="text-sm font-bold text-primary">✏️ Editing existing entry</span>
              <button onClick={resetForm} className="text-xs font-bold text-muted-foreground hover:text-foreground underline">
                Cancel edit
              </button>
            </div>
          )}

          <select
            value={selectedCountry}
            onChange={e => { setSelectedCountry(e.target.value); resetForm(); }}
            disabled={!!editingId}
            className="w-full bg-card border-2 border-border rounded-xl px-4 py-3 font-semibold text-foreground disabled:opacity-60"
          >
            {[...countries].sort((a, b) => a.name.localeCompare(b.name)).map(c => (
              <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
            ))}
          </select>

          <div className="bg-accent/30 border-2 border-accent rounded-2xl p-5">
            <p className="text-sm font-bold text-accent-foreground/70 mb-1">✨ Writing Prompt</p>
            <p className="font-bold text-foreground text-lg">{prompt}</p>
            <button onClick={newPrompt} className="btn-press mt-3 text-sm font-bold text-primary hover:underline">
              Give me a new prompt 🎲
            </button>
          </div>

          <input
            type="text"
            placeholder="Give your adventure a fun name..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-card border-2 border-border rounded-xl px-4 py-3 font-semibold text-foreground placeholder:text-muted-foreground"
          />

          <div>
            <textarea
              placeholder="Start writing your adventure here... What did you discover? What surprised you?"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={8}
              className="w-full bg-card border-2 border-border rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground resize-none"
            />
            <p className="text-xs text-muted-foreground font-semibold mt-1">
              {wordCount} words {wordCount < 30 && "— try to write at least 30 words! ✍️"}
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileUpload(f);
              e.target.value = "";
            }}
          />
          {photoUrl ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-border">
              <img src={photoUrl} alt="Journal entry" className="w-full max-h-72 object-cover" />
              <button
                onClick={() => setPhotoUrl(null)}
                className="absolute top-2 right-2 bg-foreground/80 hover:bg-foreground text-background rounded-full p-1.5"
                aria-label="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files?.[0];
                if (f) handleFileUpload(f);
              }}
              className={`btn-press cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                dragOver ? "border-primary bg-primary/10" : "border-border bg-muted/30 hover:bg-muted/50"
              }`}
            >
              <p className="text-2xl mb-1">📸</p>
              <p className="font-semibold text-muted-foreground text-sm">
                {uploading ? "Uploading..." : "Add a photo or drawing"}
              </p>
              <p className="text-xs text-muted-foreground">Drag & drop or click to upload (max 5MB)</p>
            </div>
          )}

          <div>
            <p className="text-sm font-bold text-foreground mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {defaultTags.map(tag => {
                const isSelected = selectedTags.includes(tag.name);
                const colors = tagColors[tag.color] || tagColors.primary;
                return (
                  <button
                    key={tag.name}
                    onClick={() => toggleTag(tag.name)}
                    className={`btn-press text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                      isSelected ? colors : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saveEntry.isPending || updateEntry.isPending}
            className="btn-press w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl text-lg transition-all hover:opacity-90 disabled:opacity-50"
          >
            {saveEntry.isPending || updateEntry.isPending
              ? "Saving..."
              : editingId
                ? "Update Entry ✏️"
                : "Save My Entry ✈️"}
          </button>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-lg text-foreground mb-4">Past Entries for {country.flag} {country.name}</h2>
          {countryEntries.length === 0 ? (
            <div className="bg-muted/30 rounded-2xl border-2 border-border p-6 text-center">
              <p className="text-2xl mb-2">📝</p>
              <p className="text-sm text-muted-foreground font-semibold">No entries yet for this country. Start writing!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {countryEntries.map((entry: any) => (
                <button
                  key={entry.id}
                  onClick={() => {
                    setEditingId(entry.id);
                    setTitle(entry.title || "");
                    setContent(entry.content || "");
                    setSelectedTags(entry.tags || []);
                    setPhotoUrl(entry.photo_url || null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="card-hover btn-press text-left bg-card rounded-2xl border-2 border-border p-4 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {entry.photo_url && (
                    <img src={entry.photo_url} alt="" className="w-full h-32 object-cover rounded-lg mb-2" />
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-sm text-foreground">{entry.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(entry.created_at).toLocaleDateString()} · {entry.word_count} words
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{entry.content}</p>
                  <div className="flex flex-wrap gap-1">
                    {(entry.tags || []).map((tag: string) => (
                      <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/60 text-accent-foreground">{tag}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
