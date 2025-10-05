import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/transactions`;

// Get all transactions
export const getTransactions = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add transaction
export const addTransaction = async (token, transaction) => {
  const res = await axios.post(API_URL, transaction, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get single transaction
export const getTransactionById = async (token, id) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update transaction
export const updateTransaction = async (token, id, transaction) => {
  const res = await axios.put(`${API_URL}/${id}`, transaction, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete transaction
export const deleteTransaction = async (token, id) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get summary
export const getSummary = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;  // This should return the summary data (income, expense, balance)
  } catch (error) {
    console.error("Error fetching summary", error);
    throw error;  // Throw error to handle it in AnalyticsPage
  }
};
