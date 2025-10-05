// src/pages/Transactions.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TransactionForm from "../components/TransactionForm";
import toast from "react-hot-toast";
import {
  deleteTransaction as apiDelete,
  updateTransaction as apiUpdate,
} from "../api/transaction";

export default function Transactions() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState({});

  // Delete modal
  const [deleteId, setDeleteId] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.ok) setTransactions(data.transactions);
      else toast.error(data.message || "Failed to load transactions");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTransactions();
  }, [token]);

  // Delete handlers
  const confirmDelete = (id) => setDeleteId(id);

  const handleDelete = async () => {
    try {
      await apiDelete(token, deleteId);
      setTransactions((prev) => prev.filter((t) => t._id !== deleteId));
      toast.success("Transaction deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete transaction");
    } finally {
      setDeleteId(null);
    }
  };

  // Edit handlers
  const startEdit = (t) => {
    setEditingId(t._id);
    setEditingForm({
      amount: Math.abs(t.amount).toString(),
      type: t.type,
      category: t.category,
      note: t.note || "",
      date: new Date(t.date).toISOString().slice(0, 10),
    });
  };

  const cancelEdit = () => setEditingId(null);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingForm((s) => ({ ...s, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      let amt = Number(editingForm.amount);
      if (isNaN(amt)) {
        toast.error("Amount must be a number");
        return;
      }
      amt = editingForm.type === "expense" ? -Math.abs(amt) : Math.abs(amt);

      const payload = {
        amount: amt,
        type: editingForm.type,
        category: editingForm.category,
        note: editingForm.note,
        date: editingForm.date
          ? new Date(editingForm.date).toISOString()
          : undefined,
      };

      const data = await apiUpdate(token, editingId, payload);
      setTransactions((prev) =>
        prev.map((t) => (t._id === editingId ? data.transaction : t))
      );
      toast.success("Transaction updated");
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update transaction");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <TransactionForm onSuccess={fetchTransactions} />

      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Table for desktop */}
          <table className="hidden md:table w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
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
                <tr key={t._id} className="border-b hover:bg-gray-50 transition">
                  {editingId === t._id ? (
                    <>
                      <td className="p-3">
                        <input
                          type="date"
                          name="date"
                          value={editingForm.date}
                          onChange={handleEditChange}
                          className="w-full max-w-[150px] rounded border p-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="category"
                          value={editingForm.category}
                          onChange={handleEditChange}
                          className="w-full max-w-[150px] rounded border p-1"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          name="type"
                          value={editingForm.type}
                          onChange={handleEditChange}
                          className="w-full max-w-[120px] rounded border p-1"
                        >
                          <option value="expense">expense</option>
                          <option value="income">income</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          name="amount"
                          value={editingForm.amount}
                          onChange={handleEditChange}
                          className="w-full max-w-[120px] rounded border p-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="note"
                          value={editingForm.note}
                          onChange={handleEditChange}
                          className="w-full max-w-[200px] rounded border p-1"
                        />
                      </td>
                      <td className="p-3">
                        <button
                          onClick={saveEdit}
                          className="text-green-600 hover:underline mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-600 hover:underline"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">
                        {new Date(t.date).toLocaleDateString()}
                      </td>
                      <td className="p-3 max-w-[150px] truncate">
                        {t.category}
                      </td>
                      <td
                        className={`p-3 font-semibold ${
                          t.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {t.type}
                      </td>
                      <td className="p-3">₹{t.amount}</td>
                      <td className="p-3 max-w-[200px] truncate">{t.note}</td>
                      <td className="p-3">
                        <button
                          onClick={() => startEdit(t)}
                          className="text-blue-600 hover:underline mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(t._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card view for mobile */}
          <div className="md:hidden space-y-4">
            {transactions.map((t) => (
              <div
                key={t._id}
                className="p-4 bg-white shadow rounded-md space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">
                    {new Date(t.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`font-semibold ${
                      t.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {t.type}
                  </span>
                </div>
                <div className="text-gray-700 text-sm">
                  <p>Category: {t.category}</p>
                  <p>Amount: ₹{t.amount}</p>
                  {t.note && <p>Note: {t.note}</p>}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => startEdit(t)}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(t._id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom delete modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete this transaction?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

