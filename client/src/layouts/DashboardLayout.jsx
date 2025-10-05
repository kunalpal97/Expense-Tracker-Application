// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar closed by default on mobile

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right Section */}
      <div className="flex flex-col flex-1">
        <Header setIsOpen={setIsOpen} />

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto p-4">
          {/* Outlet renders the child route (Home, Transactions, etc.) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
