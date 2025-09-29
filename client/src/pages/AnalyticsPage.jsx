import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";  // Ensure this is imported correctly
import DashboardLayout from "../components/DashboardLayout";
import { getSummary } from "../api/transaction";  // Ensure this is imported
import { Pie, Bar } from "react-chartjs-2";  // Importing Pie and Bar charts from react-chartjs-2
import { Chart as ChartJS } from "chart.js/auto"; // Import for chart auto-register

export default function AnalyticsPage() {
  const { token } = useAuth();  // Getting token from AuthContext
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getSummary(token); // Fetch summary from the backend
        setSummary(data.summary);  // Set the summary state with fetched data
      } catch (error) {
        console.error("Error fetching summary data", error);
      } finally {
        setLoading(false);  // Set loading to false after the data is fetched
      }
    };

    if (token) {
      fetchSummary();  // Only call fetchSummary if the token is available
    }
  }, [token]);  // This effect depends on the token

  // Pie Chart Data: Income vs Expense
  const pieChartData = {
    labels: ["Income", "Expense"],  // Labels for the pie chart
    datasets: [
      {
        data: [summary?.income || 0, Math.abs(summary?.expense) || 0],  // Use the income and expense values from the summary
        backgroundColor: ["rgba(34, 193, 34, 0.5)", "rgba(255, 99, 132, 0.5)"],  // Green for income, Red for expense
        hoverBackgroundColor: ["rgba(34, 193, 34, 0.7)", "rgba(255, 99, 132, 0.7)"],
      },
    ],
  };

  // Bar Chart Data: Total Balance or Transactions
  const barChartData = {
    labels: ["Balance", "Total Transactions"],  // Labels for the bar chart
    datasets: [
      {
        label: "Values",
        data: [summary?.balance || 0, summary?.totalTransactions || 0],  // Balance and total transactions
        backgroundColor: ["rgba(34, 193, 34, 0.5)", "rgba(255, 159, 64, 0.5)"],  // Different colors for each value
        borderColor: ["green", "orange"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardLayout user={JSON.parse(localStorage.getItem("user"))}>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {loading ? (
        <p>Loading...</p>  // Show loading if the data is still being fetched
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Pie Chart (Income vs Expense) */}
            <div className="bg-white p-6 rounded shadow-md h-full">
              <h2 className="text-xl font-semibold mb-4">Income vs Expense</h2>
              <Pie data={pieChartData} options={{ responsive: true }} />
            </div>

            {/* Bar Chart (Balance and Total Transactions) */}
            <div className="bg-white p-6 rounded shadow-md h-full">
              <h2 className="text-xl font-semibold mb-4">Balance and Total Transactions</h2>
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded shadow-sm">
                <h3 className="text-lg font-medium">Total Income</h3>
                <p className="text-2xl font-bold text-green-600">₹{summary?.income || 0}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded shadow-sm">
                <h3 className="text-lg font-medium">Total Expense</h3>
                <p className="text-2xl font-bold text-red-600">₹{Math.abs(summary?.expense) || 0}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded shadow-sm">
                <h3 className="text-lg font-medium">Balance</h3>
                <p className="text-2xl font-bold text-blue-600">₹{summary?.balance || 0}</p>
              </div>
              <div className="p-4 border border-gray-200 rounded shadow-sm">
                <h3 className="text-lg font-medium">Total Transactions</h3>
                <p className="text-2xl font-bold text-purple-600">{summary?.totalTransactions || 0}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
