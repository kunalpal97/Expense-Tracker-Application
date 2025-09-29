// src/components/Sidebar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  List,
  BarChart2,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar({ user }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Sidebar menu items
  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Transactions", icon: <List size={20} />, path: "/transactions" },
    { name: "Analytics", icon: <BarChart2 size={20} />, path: "/analytics" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-gray-900 text-white flex flex-col transition-all duration-300`}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h1 className="text-xl font-bold">💰 ExpenseApp</h1>}
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* User Info */}
      {isOpen && (
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded-md transition ${
              location.pathname === item.path
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-2 rounded-md bg-red-600 hover:bg-red-700"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
