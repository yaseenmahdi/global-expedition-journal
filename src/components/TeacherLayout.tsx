import { Outlet } from "react-router-dom";
import { TeacherSidebar } from "./TeacherSidebar";

export function TeacherLayout() {
  return (
    <div className="w-full">
      <TeacherSidebar />
      <main className="ml-20 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
