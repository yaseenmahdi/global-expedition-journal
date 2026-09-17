import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Copy, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const tierFor = (xp: number) =>
  xp >= 100
    ? { label: "Explorer", emoji: "🚀", className: "bg-primary/15 text-primary border-primary/30" }
    : { label: "Junior", emoji: "🌱", className: "bg-accent/40 text-accent-foreground border-accent/50" };

const medalFor = (rank: number) => (rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : `#${rank + 1}`);

export default function MyClass() {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const { data: students = [] } = useQuery({
    queryKey: ["class_students", profile?.class_code],
    queryFn: async () => {
      if (!profile?.class_code) return [];
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("class_code", profile.class_code)
        .neq("id", user!.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!profile?.class_code && !!user,
  });

  const studentIds = students.map((s: any) => s.id);

  const { data: allExplorations = [] } = useQuery({
    queryKey: ["class_explorations", profile?.class_code, studentIds.length],
    queryFn: async () => {
      if (!studentIds.length) return [];
      const { data, error } = await supabase
        .from("explorations")
        .select("*")
        .in("student_id", studentIds);
      if (error) throw error;
      return data || [];
    },
    enabled: studentIds.length > 0,
  });

  const { data: allEntries = [] } = useQuery({
    queryKey: ["class_entries", profile?.class_code, studentIds.length],
    queryFn: async () => {
      if (!studentIds.length) return [];
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .in("student_id", studentIds);
      if (error) throw error;
      return data || [];
    },
    enabled: studentIds.length > 0,
  });

  const { data: allActivities = [] } = useQuery({
    queryKey: ["class_student_activities", profile?.class_code, studentIds.length],
    queryFn: async () => {
      if (!studentIds.length) return [];
      const { data, error } = await supabase
        .from("student_activities")
        .select("*")
        .in("student_id", studentIds);
      if (error) throw error;
      return data || [];
    },
    enabled: studentIds.length > 0,
  });

  const { data: allResearch = [] } = useQuery({
    queryKey: ["class_country_research", profile?.class_code, studentIds.length],
    queryFn: async () => {
      if (!studentIds.length) return [];
      const { data, error } = await supabase
        .from("country_research")
        .select("*")
        .in("student_id", studentIds);
      if (error) throw error;
      return data || [];
    },
    enabled: studentIds.length > 0,
  });

  const completedTotal = allExplorations.filter((e: any) => e.status === "completed").length;
  const entriesTotal = allEntries.length;
  const avgXp =
    students.length > 0
      ? Math.round(students.reduce((sum: number, s: any) => sum + (s.total_xp || 0), 0) / students.length)
      : 0;
  const totalActivitiesCompleted = allActivities.length + allResearch.length;

  const leaderboard = [...students]
    .sort((a: any, b: any) => (b.total_xp || 0) - (a.total_xp || 0))
    .slice(0, 5);

  const copyCode = () => {
    if (profile?.class_code) {
      navigator.clipboard.writeText(profile.class_code);
      toast.success("Class code copied! 📋");
    }
  };

  const getStudentStats = (studentId: string) => {
    const exps = allExplorations.filter((e: any) => e.student_id === studentId);
    const entries = allEntries.filter((e: any) => e.student_id === studentId);
    return {
      completed: exps.filter((e: any) => e.status === "completed").length,
      inProgress: exps.filter((e: any) => e.status === "in_progress").length,
      entries: entries.length,
    };
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto animate-fade-slide-in">
      <h1 className="text-3xl font-heading text-foreground mb-1">Welcome, {profile?.name || "Teacher"}! 👩‍🏫</h1>
      <p className="text-muted-foreground font-semibold mb-6">Manage your class and track student progress</p>

      {/* Class Code */}
      {profile?.class_code && (
        <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Your Class Code</p>
            <p className="text-3xl font-heading text-primary tracking-wider">{profile.class_code}</p>
            <p className="text-xs text-muted-foreground mt-1">Share this with your students to join your class</p>
          </div>
          <button onClick={copyCode} className="btn-bubble bg-primary text-primary-foreground px-4 py-2 text-sm flex items-center gap-2">
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Students", value: students.length, emoji: "👩‍🎓", color: "border-primary bg-primary/5" },
          { label: "Countries Completed", value: completedTotal, emoji: "🌍", color: "border-green bg-green/5" },
          { label: "Journal Entries", value: entriesTotal, emoji: "📓", color: "border-accent bg-accent/10" },
          { label: "Average XP", value: avgXp, emoji: "⭐", color: "border-orange bg-orange/5" },
          { label: "Activities Completed", value: totalActivitiesCompleted, emoji: "✅", color: "border-teal bg-teal/5" },
        ].map(card => (
          <div key={card.label} className={`card-hover rounded-2xl border-2 p-5 ${card.color}`}>
            <span className="text-2xl">{card.emoji}</span>
            <p className="text-3xl font-heading mt-2">{card.value}</p>
            <p className="text-sm font-semibold text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Leaderboard toggle */}
      <button
        onClick={() => setShowLeaderboard(s => !s)}
        className="btn-bubble bg-accent text-accent-foreground px-5 py-2.5 mb-4 flex items-center gap-2"
      >
        <Trophy className="w-4 h-4" />
        {showLeaderboard ? "Hide" : "Show"} Class Leaderboard
        {showLeaderboard ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showLeaderboard && (
        <div className="bg-card rounded-2xl border-2 border-accent/40 p-5 mb-6 animate-fade-slide-in">
          <h2 className="text-lg font-heading text-foreground mb-3 flex items-center gap-2">
            🏆 Top 5 Explorers
          </h2>
          {leaderboard.length === 0 ? (
            <p className="text-sm text-muted-foreground font-semibold">No students yet!</p>
          ) : (
            <ol className="flex flex-col gap-2">
              {leaderboard.map((s: any, i: number) => {
                const tier = tierFor(s.total_xp || 0);
                return (
                  <li
                    key={s.id}
                    onClick={() => navigate(`/teacher/students/${s.id}`)}
                    className="card-hover flex items-center gap-3 p-3 rounded-xl border-2 border-border bg-background cursor-pointer"
                  >
                    <span className="text-2xl w-10 text-center">{medalFor(i)}</span>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: s.avatar_color || "#22c55e" }}
                    >
                      {(s.name || "?").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-foreground truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.grade || "—"}</p>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${tier.className}`}>
                      {tier.emoji} {tier.label}
                    </span>
                    <span className="font-heading text-lg text-primary">{s.total_xp || 0} XP</span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}

      {/* Student Roster */}
      <h2 className="text-xl font-heading text-foreground mb-4">Student Roster</h2>
      {students.length === 0 ? (
        <div className="bg-card rounded-2xl border-2 border-border p-10 text-center">
          <p className="text-5xl mb-3">🎒</p>
          <p className="text-lg font-heading text-foreground">No students yet!</p>
          <p className="text-sm text-muted-foreground mt-1">Share your class code to get started</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Grade</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Tier</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Completed</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-muted-foreground uppercase">In Progress</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Entries</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-muted-foreground uppercase">Total XP</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student: any) => {
                  const stats = getStudentStats(student.id);
                  const totalXp = student.total_xp || 0;
                  const tier = tierFor(totalXp);
                  return (
                    <tr
                      key={student.id}
                      onClick={() => navigate(`/teacher/students/${student.id}`)}
                      className="border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: student.avatar_color || "#22c55e" }}>
                            {(student.name || "?").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                          <span className="font-semibold text-sm text-foreground">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{student.grade || "—"}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border ${tier.className}`}>
                          {tier.emoji} {tier.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-foreground">{stats.completed}</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-foreground">{stats.inProgress}</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-foreground">{stats.entries}</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-primary">{totalXp}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
