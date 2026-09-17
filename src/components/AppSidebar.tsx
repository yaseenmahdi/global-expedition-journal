import { useEffect, useState } from "react";
import { Home, Map, BookOpen, Globe, Stamp, LogOut, X } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAvatarUrl } from "@/hooks/useAvatarUrl";
import { XP_AWARDED_EVENT } from "@/components/XpFloater";

const navItems = [
  { label: "Home", emoji: "🌍", icon: Home, path: "/" },
  { label: "Map", emoji: "🗺️", icon: Map, path: "/map" },
  { label: "Journal", emoji: "📓", icon: BookOpen, path: "/journal" },
  { label: "Countries", emoji: "🌎", icon: Globe, path: "/countries" },
  { label: "Passport", emoji: "📖", icon: Stamp, path: "/passport" },
];

const levelColors: Record<number, string> = {
  1: "ring-muted-foreground/40",
  2: "ring-green",
  3: "ring-teal",
  4: "ring-orange",
  5: "ring-yellow",
};

interface Props {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AppSidebar({ mobileOpen = false, onMobileClose }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const [pulseXp, setPulseXp] = useState(false);

  const totalXp = (profile as any)?.total_xp ?? profile?.xp_points ?? 0;
  const explorerLevel = Math.min(Math.floor(totalXp / 100) + 1, 5);
  const initials = (profile?.name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const firstName = (profile?.name || "Explorer").split(" ")[0];
  const avatarColor = profile?.avatar_color || "#22c55e";
  const avatarUrl = useAvatarUrl((profile as any)?.avatar_url);

  // Pulse the XP badge whenever XP is awarded (quiz, research, etc.)
  useEffect(() => {
    const handler = () => {
      setPulseXp(true);
      setTimeout(() => setPulseXp(false), 950);
    };
    window.addEventListener(XP_AWARDED_EVENT, handler);
    return () => window.removeEventListener(XP_AWARDED_EVENT, handler);
  }, []);

  // Close mobile drawer when navigating to a new route
  useEffect(() => {
    if (mobileOpen) onMobileClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <aside
      className={[
        "fixed top-0 left-0 h-screen bg-sidebar flex flex-col items-center py-6 gap-2 z-50 overflow-y-auto",
        "transition-transform duration-300 ease-out",
        // Width: mobile drawer 64, tablet 16 (~64px), desktop 20 (~80px)
        "w-64 md:w-16 lg:w-20",
        // Mobile: slide in/out; md+: always visible
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      ].join(" ")}
      aria-label="Main navigation"
    >
      {/* Mobile close button */}
      <button
        onClick={onMobileClose}
        className="md:hidden absolute top-3 right-3 w-8 h-8 rounded-full bg-sidebar-accent/40 text-sidebar-foreground flex items-center justify-center"
        aria-label="Close menu"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Logo */}
      <div className="w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-accent flex items-center justify-center mb-6 mt-2 md:mt-0">
        <span className="font-heading text-foreground text-lg">GX</span>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 w-full px-2 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.label}
              className={`flex md:flex-col items-center md:gap-0.5 gap-3 py-2.5 px-3 md:px-1 rounded-2xl text-sm md:text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-accent text-foreground shadow-sm"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <span className="text-2xl md:text-xl leading-none">{item.emoji}</span>
              <span className="md:text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Profile avatar with XP pulse */}
      <button
        onClick={() => navigate("/profile")}
        title={`${firstName} • Level ${explorerLevel} • ${totalXp} XP`}
        className="flex md:flex-col items-center gap-2 md:gap-0.5 py-1 px-2 md:px-1 rounded-2xl hover:bg-sidebar-accent transition-colors w-full mx-2"
      >
        <div
          className={`w-10 h-10 rounded-full ring-[3px] ${levelColors[explorerLevel] || levelColors[1]} overflow-hidden flex items-center justify-center ${pulseXp ? "animate-xp-pulse" : ""}`}
          style={{ backgroundColor: avatarUrl ? undefined : avatarColor }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-white">{initials}</span>
          )}
        </div>
        <div className="flex flex-col md:items-center items-start">
          <span className="text-[11px] md:text-[10px] text-sidebar-foreground font-semibold truncate max-w-[140px] md:max-w-[70px]">{firstName}</span>
          <span className={`text-[10px] md:text-[9px] font-bold text-accent ${pulseXp ? "animate-xp-pulse" : ""}`}>
            Lvl {explorerLevel} • {totalXp} XP
          </span>
        </div>
      </button>

      {/* Sign Out */}
      <button
        onClick={signOut}
        className="flex md:flex-col items-center gap-2 md:gap-0.5 py-2 px-3 md:px-1 rounded-2xl text-sm md:text-xs font-semibold text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200 w-full mx-2"
        title="Sign Out"
      >
        <LogOut className="w-4 h-4" />
        <span className="md:text-[9px]">Sign Out</span>
      </button>
    </aside>
  );
}
