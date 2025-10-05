import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open/close state

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header setIsOpen={setIsOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
