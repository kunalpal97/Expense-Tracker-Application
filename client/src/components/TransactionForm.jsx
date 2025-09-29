// // client/src/components/TransactionForm.jsx
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";

// export default function TransactionForm({ onAdded }) {
//   const { token } = useAuth();
//   const [form, setForm] = useState({
//     amount: "",
//     type: "expense",      // default
//     category: "",
//     note: "",
//     date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd for <input type=date>
//   });
//   const [loading, setLoading] = useState(false);

//   const categories = [
//     "Food",
//     "Travel",
//     "Salary",
//     "Shopping",
//     "Other",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // client validation
//     if (!form.amount || !form.type || !form.category) {
//       toast.error("Amount, type and category are required");
//       return;
//     }

//     // normalize amount: backend expects expense negative, income positive
//     let amt = Number(form.amount);
//     if (Number.isNaN(amt)) {
//       toast.error("Amount must be a number");
//       return;
//     }
//     if (form.type === "expense") amt = -Math.abs(amt);
//     else amt = Math.abs(amt);

//     const payload = {
//       amount: amt,
//       type: String(form.type).toLowerCase(), // ensures 'income' or 'expense'
//       category: form.category,
//       note: form.note || "",
//       date: form.date ? new Date(form.date).toISOString() : undefined,
//     };

//     setLoading(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transactions`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("Add transaction failed:", data);
//         toast.error(data.message || "Failed to add transaction");
//         return;
//       }

//       toast.success("Transaction added");
//       // reset amount & note (keep date/type/category so user can add many)
//       setForm((s) => ({ ...s, amount: "", note: "" }));

//       if (onAdded) onAdded(data.transaction);
//     } catch (err) {
//       console.error("Network error adding transaction:", err);
//       toast.error("Network/server error. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
//         <div className="col-span-1 md:col-span-1">
//           <label className="block text-sm font-medium text-gray-700">Amount</label>
//           <input
//             name="amount"
//             value={form.amount}
//             onChange={handleChange}
//             placeholder="e.g. 500"
//             className="mt-1 block w-full rounded border p-2"
//           />
//         </div>

//         <div className="col-span-1 md:col-span-1">
//           <label className="block text-sm font-medium text-gray-700">Type</label>
//           <select name="type" value={form.type} onChange={handleChange} className="mt-1 block w-full rounded border p-2">
//             <option value="expense">expense</option>
//             <option value="income">income</option>
//           </select>
//         </div>

//         <div className="col-span-1 md:col-span-1">
//           <label className="block text-sm font-medium text-gray-700">Category</label>
//           <select name="category" value={form.category} onChange={handleChange} className="mt-1 block w-full rounded border p-2">
//             <option value="">Select category</option>
//             {categories.map((c) => <option key={c} value={c}>{c}</option>)}
//           </select>
//         </div>

//         <div className="col-span-1 md:col-span-1">
//           <label className="block text-sm font-medium text-gray-700">Date</label>
//           <input name="date" type="date" value={form.date} onChange={handleChange} className="mt-1 block w-full rounded border p-2" />
//         </div>

//         <div className="col-span-1 md:col-span-4">
//           <label className="block text-sm font-medium text-gray-700">Note</label>
//           <input name="note" value={form.note} onChange={handleChange} placeholder="optional note" className="mt-1 block w-full rounded border p-2" />
//         </div>
//       </div>

//       <div className="mt-4">
//         <button type="submit" disabled={loading} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60">
//           {loading ? "Adding..." : "Add Transaction"}
//         </button>
//       </div>
//     </form>
//   );
// }

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function TransactionForm({ onAdded }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    amount: "",
    type: "expense",      // default to expense
    category: "",
    note: "",
    date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd for <input type=date>
  });
  const [loading, setLoading] = useState(false);

  const categories = ["Food", "Travel", "Salary", "Shopping", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side validation
    if (!form.amount || !form.type || !form.category) {
      toast.error("Amount, type, and category are required");
      return;
    }

    let amt = Number(form.amount);
    if (Number.isNaN(amt)) {
      toast.error("Amount must be a number");
      return;
    }
    if (form.type === "expense") amt = -Math.abs(amt);
    else amt = Math.abs(amt);

    const payload = {
      amount: amt,
      type: form.type.toLowerCase(),
      category: form.category,
      note: form.note || "",
      date: form.date ? new Date(form.date).toISOString() : undefined,
    };

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to add transaction");
        return;
      }

      toast.success("Transaction added");
      setForm({ amount: "", type: "expense", category: "", note: "", date: new Date().toISOString().slice(0, 10) });

      if (onAdded) onAdded(data.transaction);
    } catch (err) {
      toast.error("Error adding transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g. 500"
            className="mt-1 block w-full rounded border p-2"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="mt-1 block w-full rounded border p-2">
            <option value="expense">expense</option>
            <option value="income">income</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="mt-1 block w-full rounded border p-2">
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded border p-2"
          />
        </div>

        <div className="col-span-1 md:col-span-4">
          <label className="block text-sm font-medium text-gray-700">Note</label>
          <input
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Optional note"
            className="mt-1 block w-full rounded border p-2"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}
