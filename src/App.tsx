import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { TeacherLayout } from "@/components/TeacherLayout";
import Dashboard from "@/pages/Dashboard";
import WorldMap from "@/pages/WorldMap";
import Journal from "@/pages/Journal";
import Countries from "@/pages/Countries";
import CountryDetail from "@/pages/CountryDetail";
import Passport from "@/pages/Passport";
import Profile from "@/pages/Profile";
import MyCountriesCompleted from "@/pages/MyCountriesCompleted";
import MyCountriesInProgress from "@/pages/MyCountriesInProgress";
import MyJournal from "@/pages/MyJournal";
import XpLedger from "@/pages/XpLedger";
import Auth from "@/pages/Auth";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";
import MyClass from "@/pages/teacher/MyClass";
import Students from "@/pages/teacher/Students";
import StudentView from "@/pages/teacher/StudentView";
import TagsManager from "@/pages/teacher/TagsManager";
import ResourcesManager from "@/pages/teacher/ResourcesManager";
import { XpFloater } from "@/components/XpFloater";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 animate-float">
            <span className="font-heading text-foreground text-2xl">GX</span>
          </div>
          <p className="text-muted-foreground font-semibold">Loading your adventure...</p>
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

const AppRoutes = () => {
  const { user, loading, role } = useAuth();

  if (loading) return null;

  // Teacher routes
  if (user && role === "teacher") {
    return (
      <Routes>
        <Route path="/auth" element={<Navigate to="/teacher" replace />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute><TeacherLayout /></ProtectedRoute>}>
          <Route path="/teacher" element={<MyClass />} />
          <Route path="/teacher/students" element={<Students />} />
          <Route path="/teacher/students/:studentId" element={<StudentView />} />
          <Route path="/teacher/tags" element={<TagsManager />} />
          <Route path="/teacher/resources" element={<ResourcesManager />} />
        </Route>
        {/* Redirect student routes to teacher home */}
        <Route path="/" element={<Navigate to="/teacher" replace />} />
        <Route path="/map" element={<Navigate to="/teacher" replace />} />
        <Route path="/journal" element={<Navigate to="/teacher" replace />} />
        <Route path="/countries" element={<Navigate to="/teacher" replace />} />
        <Route path="/countries/:countryId" element={<Navigate to="/teacher" replace />} />
        <Route path="/passport" element={<Navigate to="/teacher" replace />} />
        <Route path="/profile" element={<Navigate to="/teacher" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Student routes
  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<WorldMap />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:countryId" element={<CountryDetail />} />
        <Route path="/passport" element={<Passport />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-countries/completed" element={<MyCountriesCompleted />} />
        <Route path="/my-countries/in-progress" element={<MyCountriesInProgress />} />
        <Route path="/my-journal" element={<MyJournal />} />
        <Route path="/xp-ledger" element={<XpLedger />} />
      </Route>
      {/* Redirect teacher routes to student home */}
      <Route path="/teacher" element={user ? <Navigate to="/" replace /> : <Navigate to="/auth" replace />} />
      <Route path="/teacher/*" element={user ? <Navigate to="/" replace /> : <Navigate to="/auth" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <XpFloater />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
