import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // Supabase places a recovery session in the URL hash. The auth client
  // automatically picks it up — we just listen for the PASSWORD_RECOVERY event.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });

    // If the user reloads after recovery is already active, check session.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated! 🔑 You're all set.");
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (err: any) {
      toast.error(err.message || "Couldn't update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-slide-in">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
            <span className="font-heading text-foreground text-3xl">GX</span>
          </div>
          <h1 className="text-3xl text-foreground">Set a New Password 🔑</h1>
          <p className="text-muted-foreground font-semibold mt-1">Pick something you'll remember!</p>
        </div>

        <div className="bg-card rounded-2xl border-2 border-border p-6">
          {!ready ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground font-semibold mb-3">Checking your reset link...</p>
              <p className="text-xs text-muted-foreground">
                If this page doesn't load, request a new password reset link from the login page.
              </p>
              <button
                onClick={() => navigate("/auth")}
                className="btn-bubble mt-5 px-5 py-2 bg-muted text-muted-foreground text-sm"
              >
                ← Back to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-semibold text-foreground placeholder:text-muted-foreground"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                minLength={6}
                className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-semibold text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-bubble w-full py-4 bg-primary text-primary-foreground text-base disabled:opacity-50"
              >
                {loading ? "Saving..." : "Update password ✨"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
