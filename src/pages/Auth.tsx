import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Role = "student" | "teacher";
type Mode = "login" | "signup" | "forgot";

const gradeOptions = ["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const juniorGrades = ["K", "1st", "2nd", "3rd"];
const getTier = (g: string) => (juniorGrades.includes(g) ? "junior" : "explorer");
const tierLabel = (g: string) =>
  getTier(g) === "junior"
    ? "You'll be a Global Ex Kids Junior! 🌱"
    : "You'll be a Global Ex Kids Explorer! 🚀";

export default function Auth() {
  const [role, setRole] = useState<Role | null>(null);
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("K");
  const [classCode, setClassCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setLoading(true);

    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset email sent! 📬 Check your inbox.");
        setMode("login");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              name,
              role,
              ...(role === "student" ? { grade, tier: getTier(grade) } : {}),
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          await supabase.from("profiles").update({
            name,
            grade: role === "student" ? grade : null,
            class_code: classCode,
          }).eq("id", data.user.id);

          toast.success("Account created! Welcome aboard, Explorer! 🌍");
          navigate("/");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back! 🌟");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-slide-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
            <span className="font-heading text-foreground text-3xl">GX</span>
          </div>
          <h1 className="text-3xl text-foreground">Global Expedition Journal</h1>
          <p className="text-muted-foreground font-semibold mt-1">Bringing the world to every kid's home and classroom 🌍</p>
        </div>

        {/* Role Selection */}
        {!role ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setRole("student")}
              className="btn-bubble w-full py-5 text-xl bg-primary text-primary-foreground"
            >
              I'm a Student 🎒
            </button>
            <button
              onClick={() => setRole("teacher")}
              className="btn-bubble w-full py-5 text-xl bg-secondary text-secondary-foreground"
            >
              I'm a Teacher 👩‍🏫
            </button>
          </div>
        ) : (
          <div className="bg-card rounded-3xl border-2 border-border p-6">
            {/* Back button */}
            <button
              onClick={() => { setRole(null); setMode("login"); }}
              className="text-primary font-bold hover:underline mb-4 inline-block text-sm"
            >
              ← Change role
            </button>

            <p className="font-heading text-lg text-foreground mb-4">
              {role === "student" ? "🎒 Student" : "👩‍🏫 Teacher"} —{" "}
              {mode === "login" ? "Log In" : mode === "signup" ? "Sign Up" : "Reset Password"}
            </p>

            {/* Mode Toggle (hidden in forgot mode) */}
            {mode !== "forgot" && (
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setMode("login")}
                  className={`btn-bubble flex-1 py-2 text-sm ${
                    mode === "login" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`btn-bubble flex-1 py-2 text-sm ${
                    mode === "signup" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === "signup" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-semibold text-foreground placeholder:text-muted-foreground"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-semibold text-foreground placeholder:text-muted-foreground"
              />

              {mode !== "forgot" && (
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-semibold text-foreground placeholder:text-muted-foreground"
                />
              )}

              {mode === "signup" && role === "student" && (
                <div className="flex flex-col gap-2">
                  <select
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-semibold text-foreground"
                  >
                    {gradeOptions.map(g => (
                      <option key={g} value={g}>{g} Grade</option>
                    ))}
                  </select>
                  <div className={`rounded-2xl px-4 py-2.5 text-sm font-bold text-center ${getTier(grade) === "junior" ? "bg-accent/40 text-accent-foreground" : "bg-primary/15 text-primary"}`}>
                    {tierLabel(grade)}
                  </div>
                </div>
              )}

              {mode === "signup" && (
                <input
                  type="text"
                  placeholder={role === "teacher" ? "Create a Class Code (e.g. EXPLORE-2025)" : "Class Code (from your teacher)"}
                  value={classCode}
                  onChange={e => setClassCode(e.target.value)}
                  required
                  className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 font-semibold text-foreground placeholder:text-muted-foreground"
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-bubble w-full bg-primary text-primary-foreground py-4 text-lg disabled:opacity-50"
              >
                {loading
                  ? "Loading..."
                  : mode === "login"
                  ? "Log In 🚀"
                  : mode === "signup"
                  ? "Create Account ✨"
                  : "Send reset link 📬"}
              </button>

              {/* Forgot password link */}
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-primary font-bold hover:underline text-sm self-center mt-1"
                >
                  Forgot Password? 🔑
                </button>
              )}
              {mode === "forgot" && (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-muted-foreground font-bold hover:underline text-sm self-center mt-1"
                >
                  ← Back to login
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
