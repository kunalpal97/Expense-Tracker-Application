import React from "react";
import { useAuth } from "../context/AuthContext"; // Adjust path if needed

export default function Profile() {
  const { isAuthenticated } = useAuth();

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="p-8 bg-white rounded-3xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Profile</h2>
          <p className="text-gray-600 text-lg">You are not logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          {/* Profile Avatar */}
          <div className="w-28 h-28 bg-gradient-to-tr from-blue-400 to-purple-500 text-white rounded-full mb-6 flex items-center justify-center text-4xl font-bold shadow-lg">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          {/* User Info */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">{name}</h2>
          <p className="text-gray-500 mb-6 text-lg">{email}</p>

          {/* Logout Button */}
          <button
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
