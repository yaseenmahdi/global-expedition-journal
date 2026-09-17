import { useState, useRef } from "react";
import { useAvatarUrl } from "@/hooks/useAvatarUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Camera, Pencil, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const levelColors: Record<number, string> = {
  1: "ring-muted-foreground/40",
  2: "ring-green-500",
  3: "ring-teal-500",
  4: "ring-orange-500",
  5: "ring-yellow-400",
};

const levelNames: Record<number, string> = {
  1: "Beginner Explorer",
  2: "Junior Explorer",
  3: "Rising Explorer",
  4: "Senior Explorer",
  5: "Master Explorer",
};

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(profile?.name || "");
  const fileRef = useRef<HTMLInputElement>(null);

  const totalXp = (profile as any)?.total_xp ?? profile?.xp_points ?? 0;
  const explorerLevel = Math.min(Math.floor(totalXp / 100) + 1, 5);
  const initials = (profile?.name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const avatarColor = profile?.avatar_color || "#22c55e";
  const avatarUrl = useAvatarUrl((profile as any)?.avatar_url);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 2 * 1024 * 1024) { toast.error("Image must be under 2MB"); return; }
    if (!file.type.startsWith("image/")) { toast.error("Please upload a JPG or PNG image"); return; }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/avatar.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (uploadErr) throw uploadErr;
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
      const avatarUrlNew = urlData.publicUrl + "?t=" + Date.now();
      const { error: updateErr } = await supabase.from("profiles").update({ avatar_url: avatarUrlNew } as any).eq("id", user.id);
      if (updateErr) throw updateErr;
      await refreshProfile();
      toast.success("Profile photo updated! 📸");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveName = async () => {
    if (!user || !newName.trim()) return;
    try {
      const { error } = await supabase.from("profiles").update({ name: newName.trim() } as any).eq("id", user.id);
      if (error) throw error;
      await refreshProfile();
      setEditing(false);
      toast.success("Name updated! ✏️");
    } catch (err: any) {
      toast.error(err.message || "Failed to update name");
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto animate-fade-slide-in">
      <button onClick={() => navigate(-1)} className="text-primary font-bold hover:underline mb-6 inline-flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-3xl font-heading text-foreground mb-6">My Profile 👤</h1>

      <div className="bg-card rounded-2xl border-2 border-border p-8 flex flex-col items-center gap-4 mb-6">
        {/* Avatar */}
        <div className="relative">
          <div
            className={`w-28 h-28 rounded-full ring-4 ${levelColors[explorerLevel] || levelColors[1]} overflow-hidden flex items-center justify-center`}
            style={{ backgroundColor: avatarUrl ? undefined : avatarColor }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-white">{initials}</span>
            )}
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleUpload} />
        </div>
        {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}

        {/* Name */}
        {editing ? (
          <div className="flex items-center gap-2 w-full max-w-xs">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="flex-1 bg-muted border-2 border-border rounded-xl px-3 py-2 text-sm font-semibold text-foreground"
              autoFocus
            />
            <Button onClick={handleSaveName} size="sm">Save</Button>
            <Button onClick={() => setEditing(false)} variant="ghost" size="sm">Cancel</Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-heading text-foreground">{profile?.name || "Explorer"}</h2>
            <button onClick={() => { setEditing(true); setNewName(profile?.name || ""); }} className="text-muted-foreground hover:text-primary">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        )}

        {profile?.grade && <p className="text-sm text-muted-foreground font-semibold">Grade: {profile.grade}</p>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-2xl border-2 border-border p-6 text-center">
          <p className="text-3xl font-heading text-primary">{explorerLevel}</p>
          <p className="text-sm font-semibold text-foreground mt-1">{levelNames[explorerLevel]}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Explorer Level</p>
        </div>
        <div className="bg-card rounded-2xl border-2 border-border p-6 text-center">
          <p className="text-3xl font-heading text-primary">{totalXp}</p>
          <p className="text-sm font-semibold text-foreground mt-1">Experience Points</p>
          <p className="text-xs text-muted-foreground mt-0.5">Keep exploring to earn more!</p>
        </div>
      </div>

      {/* Level progress */}
      <div className="bg-card rounded-2xl border-2 border-border p-6">
        <h3 className="font-heading text-foreground mb-3">Level Progress</h3>
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4, 5].map(lvl => (
            <div key={lvl} className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full ring-2 ${levelColors[lvl]} flex items-center justify-center text-xs font-bold ${explorerLevel >= lvl ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {lvl}
              </span>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${explorerLevel >= lvl ? "text-foreground" : "text-muted-foreground"}`}>{levelNames[lvl]}</p>
                <p className="text-[10px] text-muted-foreground">{(lvl - 1) * 100} XP</p>
              </div>
              {explorerLevel >= lvl && <span className="text-sm">✅</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
