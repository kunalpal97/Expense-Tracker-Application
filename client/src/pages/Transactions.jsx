

// src/pages/Transactions.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TransactionForm from "../components/TransactionForm";
import toast from "react-hot-toast";
import {
  deleteTransaction as apiDelete,
  updateTransaction as apiUpdate,
} from "../api/transaction";

// Icons
import { Edit2, Trash2 } from "lucide-react";

function formatCurrency(n) {
  if (n == null) return "₹0";
  return "₹" + Number(n).toLocaleString("en-IN");
}

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

  // Prevent background scroll when modal open
  useEffect(() => {
    if (editingId || deleteId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [editingId, deleteId]);

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

  const cancelEdit = () => {
    setEditingId(null);
    setEditingForm({});
  };

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
      setEditingForm({});
    } catch (err) {
      console.error(err);
      toast.error("Failed to update transaction");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      {/* Add form */}
      <div className="mb-6">
        <TransactionForm onSuccess={fetchTransactions} />
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center py-8 text-gray-600">Loading...</p>
      ) : transactions.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <p className="mb-4">No transactions yet — add your first one!</p>
        </div>
      ) : (
        <div>
          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full table-auto bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-right">Amount</th>
                    <th className="p-3 text-left">Note</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t._id} className="border-t hover:bg-gray-50">
                      {editingId === t._id ? (
                        <>
                          <td className="p-3">
                            <input
                              type="date"
                              name="date"
                              value={editingForm.date}
                              onChange={handleEditChange}
                              className="w-full max-w-[160px] rounded border p-2"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              name="category"
                              value={editingForm.category}
                              onChange={handleEditChange}
                              className="w-full max-w-[200px] rounded border p-2"
                            />
                          </td>
                          <td className="p-3">
                            <select
                              name="type"
                              value={editingForm.type}
                              onChange={handleEditChange}
                              className="rounded border p-2"
                            >
                              <option value="expense">expense</option>
                              <option value="income">income</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <input
                              name="amount"
                              value={editingForm.amount}
                              onChange={handleEditChange}
                              className="w-full max-w-[140px] rounded border p-2 text-right"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              name="note"
                              value={editingForm.note}
                              onChange={handleEditChange}
                              className="w-full rounded border p-2"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={saveEdit}
                              className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded mr-2"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="inline-flex items-center px-3 py-1 bg-gray-200 rounded"
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
                          <td className="p-3 max-w-[220px] truncate">
                            {t.category}
                          </td>
                          <td className="p-3">
                            <span
                              className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                                t.type === "income"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {t.type}
                            </span>
                          </td>
                          <td className="p-3 text-right font-semibold">
                            {formatCurrency(t.amount)}
                          </td>
                          <td className="p-3 max-w-[300px] truncate">
                            {t.note}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => startEdit(t)}
                              className="inline-flex items-center gap-2 px-3 py-1 text-blue-600 hover:underline mr-2"
                              aria-label="Edit transaction"
                            >
                              <Edit2 size={16} /> Edit
                            </button>
                            <button
                              onClick={() => confirmDelete(t._id)}
                              className="inline-flex items-center gap-2 px-3 py-1 text-red-600 hover:underline"
                              aria-label="Delete transaction"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {transactions.map((t) => (
              <div
                key={t._id}
                className="bg-white p-4 rounded-lg shadow-sm border relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-500">
                        {new Date(t.date).toLocaleDateString()}
                      </div>

                      <div
                        className={`ml-2 inline-block text-xs px-2 py-1 rounded ${
                          t.type === "income"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {t.type}
                      </div>
                    </div>

                    <div className="mt-3 text-gray-800">
                      <div className="font-medium">{t.category}</div>
                      <div className="text-sm mt-1">{t.note}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="font-semibold text-lg">
                      {formatCurrency(t.amount)}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(t)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded"
                        aria-label="Edit transaction"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(t._id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded"
                        aria-label="Delete transaction"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
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

      {/* Edit Modal (mobile + desktop) */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Transaction</h3>
              <button
                onClick={cancelEdit}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close edit modal"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={editingForm.date || ""}
                  onChange={handleEditChange}
                  className="mt-1 block w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  name="category"
                  value={editingForm.category || ""}
                  onChange={handleEditChange}
                  placeholder="e.g. Food"
                  className="mt-1 block w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  name="type"
                  value={editingForm.type || "expense"}
                  onChange={handleEditChange}
                  className="mt-1 block w-full rounded border p-2"
                >
                  <option value="expense">expense</option>
                  <option value="income">income</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  name="amount"
                  value={editingForm.amount || ""}
                  onChange={handleEditChange}
                  placeholder="e.g. 500"
                  className="mt-1 block w-full rounded border p-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Note
                </label>
                <input
                  name="note"
                  value={editingForm.note || ""}
                  onChange={handleEditChange}
                  placeholder="Optional note"
                  className="mt-1 block w-full rounded border p-2"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}









