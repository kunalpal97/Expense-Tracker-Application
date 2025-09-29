// src/components/DashboardLayout.jsx
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, user }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}
