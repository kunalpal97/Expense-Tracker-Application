// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { Home, List, BarChart, User, LogOut } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "Transactions", icon: List, path: "/transactions" },
    { name: "Analytics", icon: BarChart, path: "/analytics" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 bg-[#0f172a] text-white transform transition-transform duration-300 md:translate-x-0 md:relative",
        { "-translate-x-full": !isOpen }
      )}
    >
      {/* Logo */}
      <div className="p-4 text-2xl font-bold flex items-center gap-2">
        💰 ExpenseApp
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-2 p-2 rounded transition-colors",
                  isActive
                    ? "bg-[#1e293b]"
                    : "hover:bg-[#1e293b] text-gray-300"
                )
              }
              onClick={() => setIsOpen(false)} // close on mobile tap
            >
              <Icon /> {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 p-2 rounded hover:bg-red-700 transition"
        >
          <LogOut /> Logout
        </button>
      </div>
    </div>
  );
}