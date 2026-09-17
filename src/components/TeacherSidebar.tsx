import { Home, Users, Tag, Globe, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "My Class", emoji: "🏠", icon: Home, path: "/teacher" },
  { label: "Students", emoji: "👩‍🎓", icon: Users, path: "/teacher/students" },
  { label: "Tags", emoji: "🏷️", icon: Tag, path: "/teacher/tags" },
  { label: "Resources", emoji: "🌍", icon: Globe, path: "/teacher/resources" },
];

export function TeacherSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <aside className="fixed top-0 left-0 w-20 h-screen bg-sidebar flex flex-col items-center py-6 gap-2 z-50 overflow-y-auto">
      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-6">
        <span className="font-heading text-foreground text-lg">GX</span>
      </div>

      <nav className="flex flex-col gap-1 w-full px-2 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/teacher/students" && location.pathname.startsWith("/teacher/students/"));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 py-2.5 px-1 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-accent text-foreground shadow-sm"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <span className="text-xl leading-none">{item.emoji}</span>
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={signOut}
        className="flex flex-col items-center gap-0.5 py-2.5 px-1 rounded-xl text-xs font-semibold text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200 w-full mx-2"
        title="Sign Out"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-[10px]">Sign Out</span>
      </button>
    </aside>
  );
}
