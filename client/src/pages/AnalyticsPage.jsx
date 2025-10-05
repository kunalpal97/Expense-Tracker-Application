import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getSummary } from "../api/transaction";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

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

  // Pie Chart: Income vs Expense
  const pieChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [summary?.income || 0, Math.abs(summary?.expense) || 0],
        backgroundColor: [
          "rgba(34, 193, 34, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        hoverBackgroundColor: [
          "rgba(34, 193, 34, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
      },
    ],
  };

  // Bar Chart: Balance and Transactions
  const barChartData = {
    labels: ["Balance", "Total Transactions"],
    datasets: [
      {
        label: "Values",
        data: [summary?.balance || 0, summary?.totalTransactions || 0],
        backgroundColor: [
          "rgba(34, 193, 34, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: ["green", "orange"],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <p className="text-center text-lg">Loading analytics...</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart (Income vs Expense) */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Income vs Expense</h2>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>

        {/* Bar Chart (Balance & Transactions) */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Balance & Total Transactions
          </h2>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Income"
            value={`₹${summary?.income || 0}`}
            color="text-green-600"
          />
          <SummaryCard
            title="Total Expense"
            value={`₹${Math.abs(summary?.expense) || 0}`}
            color="text-red-600"
          />
          <SummaryCard
            title="Balance"
            value={`₹${summary?.balance || 0}`}
            color="text-blue-600"
          />
          <SummaryCard
            title="Total Transactions"
            value={summary?.totalTransactions || 0}
            color="text-purple-600"
          />
        </div>
      </div>
    </div>
  );
}

// ✅ Reusable Summary Card Component
function SummaryCard({ title, value, color }) {
  return (
    <div className="p-4 border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
