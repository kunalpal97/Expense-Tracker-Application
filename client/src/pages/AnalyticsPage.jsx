
// src/pages/AnalyticsPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getSummary } from "../api/transaction";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getSummary(token);
        setSummary(data.summary);
      } catch (error) {
        console.error("Error fetching summary data", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchSummary();
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <p className="text-center text-gray-500 text-lg mt-20">
        No analytics data available.
      </p>
    );
  }

  // Pie Chart: Income vs Expense
  const pieChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [summary?.income || 0, Math.abs(summary?.expense) || 0],
        backgroundColor: ["#4ade80", "#f87171"],
        borderColor: ["#16a34a", "#dc2626"],
        borderWidth: 2,
      },
    ],
  };

  // Bar Chart: Balance and Total Transactions
  const barChartData = {
    labels: ["Balance", "Total Transactions"],
    datasets: [
      {
        label: "Overview",
        data: [summary?.balance || 0, summary?.totalTransactions || 0],
        backgroundColor: ["#60a5fa", "#a78bfa"],
        borderColor: ["#1d4ed8", "#7e22ce"],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Analytics Overview
      </motion.h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Income vs Expense
          </h2>
          <div className="h-[300px] flex items-center justify-center">
            <Pie
              data={pieChartData}
              options={{
                plugins: {
                  legend: { position: "bottom" },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Balance & Transactions
          </h2>
          <div className="h-[300px] flex items-center justify-center">
            <Bar
              data={barChartData}
              options={{
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    ticks: { beginAtZero: true },
                    grid: { color: "rgba(0,0,0,0.05)" },
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <SummaryCard
          title="Total Income"
          value={`₹${summary?.income || 0}`}
          gradient="from-green-400 to-green-600"
          icon="💰"
        />
        <SummaryCard
          title="Total Expense"
          value={`₹${Math.abs(summary?.expense) || 0}`}
          gradient="from-red-400 to-red-600"
          icon="💸"
        />
        <SummaryCard
          title="Balance"
          value={`₹${summary?.balance || 0}`}
          gradient="from-blue-400 to-blue-600"
          icon="📊"
        />
        <SummaryCard
          title="Total Transactions"
          value={summary?.totalTransactions || 0}
          gradient="from-purple-400 to-purple-600"
          icon="📈"
        />
      </motion.div>
    </div>
  );
}

// ✅ Modern Summary Card Component
function SummaryCard({ title, value, gradient, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className={`p-5 rounded-2xl shadow-md bg-gradient-to-r ${gradient} text-white flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold mt-3">{value}</p>
    </motion.div>
  );
}
