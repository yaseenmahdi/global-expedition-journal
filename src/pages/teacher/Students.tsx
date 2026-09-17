import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const { data: students = [] } = useQuery({
    queryKey: ["class_students_list", profile?.class_code],
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

  const { data: allExplorations = [] } = useQuery({
    queryKey: ["class_explorations_list", profile?.class_code],
    queryFn: async () => {
      if (!students.length) return [];
      const ids = students.map(s => s.id);
      const { data, error } = await supabase.from("explorations").select("*").in("student_id", ids);
      if (error) throw error;
      return data || [];
    },
    enabled: students.length > 0,
  });

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto animate-fade-slide-in">
      <h1 className="text-3xl font-heading text-foreground mb-6">Students 👩‍🎓</h1>

      {students.length === 0 ? (
        <div className="bg-card rounded-2xl border-2 border-border p-10 text-center">
          <p className="text-5xl mb-3">🎒</p>
          <p className="text-lg font-heading text-foreground">No students yet!</p>
          <p className="text-sm text-muted-foreground mt-1">Share your class code to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student: any) => {
            const exps = allExplorations.filter((e: any) => e.student_id === student.id);
            const completed = exps.filter((e: any) => e.status === "completed").length;
            const inProgress = exps.filter((e: any) => e.status === "in_progress").length;
            const level = Math.min(Math.floor((student.xp_points || 0) / 100) + 1, 5);
            const initials = (student.name || "?").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

            return (
              <button
                key={student.id}
                onClick={() => navigate(`/teacher/students/${student.id}`)}
                className="card-hover bg-card rounded-2xl border-2 border-border p-5 text-left transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: student.avatar_color || "#22c55e" }}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-heading text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">Grade: {student.grade || "—"} · Level {level}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-center">
                  <div>
                    <p className="text-lg font-heading text-primary">{completed}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Completed</p>
                  </div>
                  <div>
                    <p className="text-lg font-heading" style={{ color: "#14b8a6" }}>{inProgress}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">In Progress</p>
                  </div>
                  <div>
                    <p className="text-lg font-heading text-foreground">{student.xp_points || 0}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">XP</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
