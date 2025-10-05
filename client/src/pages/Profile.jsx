// src/pages/Profile.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const { isAuthenticated } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  // Loader when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Profile</h2>
          <p className="text-gray-600 text-lg">You are not logged in.</p>
        </motion.div>
      </div>
    );
  }

  // Main Profile View
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/40"
      >
        <div className="flex flex-col items-center">
          {/* Profile Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="w-28 h-28 bg-gradient-to-tr from-blue-500 to-purple-600 text-white rounded-full mb-6 flex items-center justify-center text-4xl font-bold shadow-xl ring-4 ring-white/70"
          >
            {name ? name.charAt(0).toUpperCase() : "U"}
          </motion.div>

          {/* User Info */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-semibold text-gray-800 mb-2 text-center"
          >
            {name || "Unknown User"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-6 text-lg text-center"
          >
            {email || "No email found"}
          </motion.p>

          {/* Buttons Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition"
            >
              Logout
            </button>

            <button
              onClick={() => window.location.href = "/transactions"}
              className="px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition"
            >
              View Transactions
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-xl w-[90%] max-w-sm text-center"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md hover:opacity-90 transition"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
