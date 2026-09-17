import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import { Onboarding } from "./Onboarding";

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Mobile header (visible < md) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-sidebar text-sidebar-foreground flex items-center px-3 gap-2 z-40 shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="btn-press w-10 h-10 rounded-full bg-sidebar-accent/40 flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
          <span className="font-heading text-foreground text-sm">GX</span>
        </div>
        <p className="font-heading text-sidebar-foreground text-base">Global Expedition</p>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-50 animate-fade-slide-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar:
          - Mobile (< md): slide-in overlay drawer
          - Tablet (md-lg): icon-collapsed (60px / w-16)
          - Desktop (>= lg): full (w-20) */}
      <AppSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <main className="pt-14 md:pt-0 md:ml-16 lg:ml-20 h-screen overflow-y-auto">
        <Outlet />
      </main>

      {/* First-time onboarding overlay */}
      <Onboarding />
    </div>
  );
}
