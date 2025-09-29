// controllers/transactionController.js
const Transaction = require("../models/Transaction");

// ➤ Add Transaction
// ➤ Add Transaction with validation
const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, note, date } = req.body;

    // Validation checks
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (type === "expense" && amount > 0) {
      return res.status(400).json({ success: false, message: "Expense amount should be negative" });
    }

    if (type === "income" && amount < 0) {
      return res.status(400).json({ success: false, message: "Income amount should be positive" });
    }

    const validCategories = ["Food", "Travel", "Salary", "Shopping", "Other"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    if (new Date(date) > new Date()) {
      return res.status(400).json({ success: false, message: "Date cannot be in the future" });
    }

    const transaction = new Transaction({
      userId: req.user._id,
      amount,
      type,
      category,
      note,
      date,
    });

    await transaction.save();
    res.status(201).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add transaction", error });
  }
};

// ➤ Get Summary (analytics)
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    const balance = income + expense;

    res.status(200).json({
      success: true,
      summary: {
        income,
        expense,
        balance,
        totalTransactions: transactions.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch summary",
      error: error.message,
    });
  }
};


// ➤ Get All Transactions (for logged in user)
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch transactions", error: error.message });
  }
};

// ➤ Get Single Transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({ _id: id, userId: req.user._id });

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch transaction", error: error.message });
  }
};

// ➤ Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update transaction", error: error.message });
  }
};

// ➤ Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete transaction", error: error.message });
  }
};




module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};
