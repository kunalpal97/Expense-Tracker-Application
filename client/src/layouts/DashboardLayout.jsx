import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, List, BarChart, User, LogOut, Menu } from "lucide-react";
import clsx from "clsx";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    { name: "Transactions", icon: <List size={20} />, path: "/transactions" },
    { name: "Analytics", icon: <BarChart size={20} />, path: "/analytics" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#0f172a] text-white transform transition-transform duration-300 flex flex-col md:relative md:translate-x-0",
          { "-translate-x-full": !isOpen }
        )}
      >
        {/* Logo Section */}
        <div className="p-4 text-2xl font-bold flex items-center justify-between border-b border-gray-700">
          💰 ExpenseApp
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={clsx(
                "flex items-center gap-3 p-2 rounded transition-colors",
                location.pathname === item.path
                  ? "bg-[#1e293b]"
                  : "hover:bg-[#1e293b]"
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button - Always at bottom */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 p-2 rounded transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md z-30">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Menu />
          </button>

          <h1 className="text-xl font-semibold">ExpenseApp</h1>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-4 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
