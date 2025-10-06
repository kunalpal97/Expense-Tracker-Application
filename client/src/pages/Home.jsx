import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { getTransactions } from "../api/transaction";

// COLORS for pie chart
const COLORS = ["#60a5fa", "#f87171", "#34d399", "#fbbf24", "#a78bfa"];

// ---------- Reusable Components ----------
const SummaryCard = ({ title, value, color }) => (
  <motion.div
    className={`bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transform hover:-translate-y-1 transition`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </motion.div>
);

const TransactionItem = ({ tx }) => (
  <li className="flex justify-between items-center border-b border-gray-100 py-2">
    <div>
      <p className="font-medium">{tx.category || "Other"}</p>
      <p className="text-gray-500 text-sm truncate" title={tx.note}>
        {tx.note || "-"}
      </p>
    </div>
    <div
      className={`font-semibold ${tx.amount >= 0 ? "text-green-600" : "text-red-600"}`}
    >
      ₹{tx.amount.toLocaleString("en-IN")}
    </div>
  </li>
);

const LoaderSkeleton = () => (
  <div className="animate-pulse space-y-2">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    <div className="h-6 bg-gray-200 rounded w-full"></div>
  </div>
);

// ---------- Custom label for PieChart ----------
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  if (percent < 0.03) return null; // Skip very small slices
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {name}
    </text>
  );
};

// ---------- Main Home Component ----------
export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions(token);
      const list = Array.isArray(data) ? data : data.transactions || [];
      setTransactions(list);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Summary calculations
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpense;

  // Category-wise data for pie chart
  const categoryData = transactions.reduce((acc, tx) => {
    const cat = tx.category || "Other";
    const existing = acc.find((c) => c.name === cat);
    if (existing) {
      existing.value += Math.abs(tx.amount);
    } else {
      acc.push({ name: cat, value: Math.abs(tx.amount) });
    }
    return acc;
  }, []);

  // Last 5 transactions
  const recentTx = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Heading */}
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome, {user?.name} 👋
      </motion.h1>
      <p className="text-gray-600 mb-6">
        Here’s a quick overview of your finances
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="Total Income"
          value={`₹${totalIncome.toLocaleString("en-IN")}`}
          color="text-green-600"
        />
        <SummaryCard
          title="Total Expense"
          value={`₹${totalExpense.toLocaleString("en-IN")}`}
          color="text-red-600"
        />
        <SummaryCard
          title="Balance"
          value={`₹${balance.toLocaleString("en-IN")}`}
          color="text-gray-800"
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        className="flex flex-wrap gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/transactions"
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          + Add Transaction
        </Link>
        <Link
          to="/transactions"
          className="bg-gray-100 text-gray-800 px-5 py-2 rounded-xl shadow hover:bg-gray-200 transition"
        >
          View All Transactions
        </Link>
        <Link
          to="/analytics"
          className="bg-blue-100 text-blue-800 px-5 py-2 rounded-xl shadow hover:bg-blue-200 transition"
        >
          Analytics
        </Link>
      </motion.div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
          {loading ? (
            <LoaderSkeleton />
          ) : recentTx.length === 0 ? (
            <p className="text-gray-400">No recent transactions</p>
          ) : (
            <ul className="space-y-2">
              {recentTx.map((tx) => (
                <TransactionItem key={tx._id || tx.id} tx={tx} />
              ))}
            </ul>
          )}
        </motion.div>

        {/* Category Pie Chart */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ height: "22rem" }} // increased height for spacing (around 352px)
          >
            <h2 className="text-lg font-semibold mb-3 self-start">Category-wise Spending</h2>

            {transactions.length === 0 ? (
              <p className="text-gray-400">No transactions to display</p>
            ) : (
              <div className="flex-1 w-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      outerRadius={90}
                      label={renderCustomizedLabel}
                      labelLine={false}
                      isAnimationActive={true}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [
                        `₹${value.toLocaleString("en-IN")}`,
                        name,
                      ]}
                    />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      iconType="square"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>

      </div>
    </div>
  );
}
