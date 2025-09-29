// src/pages/Transactions.jsx
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import TransactionForm from "../components/TransactionForm";
import toast from "react-hot-toast";

export default function Transactions() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTransactions(data.transactions);
      } else {
        toast.error(data.message || "Failed to load transactions");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <DashboardLayout user={JSON.parse(localStorage.getItem("user"))}>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Add Transaction Form */}
      <TransactionForm token={token} onSuccess={fetchTransactions} />

      <hr className="my-4" />

      {/* Show transactions */}
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Date</th>
                <th className="p-3">Category</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Note</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{t.category}</td>
                  <td
                    className={`p-3 font-semibold ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type}
                  </td>
                  <td className="p-3">₹{t.amount}</td>
                  <td className="p-3">{t.note}</td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:underline mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
