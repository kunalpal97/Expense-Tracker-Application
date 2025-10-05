// src/components/Header.jsx
import { Menu } from "lucide-react";

export default function Header({ setIsOpen }) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md sticky top-0 z-20">
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Menu />
      </button>

      <h1 className="text-xl font-semibold">ExpenseApp</h1>
    </header>
  );
}
