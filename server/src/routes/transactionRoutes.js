// routes/transactionRoutes.js
const express = require("express");
const {
  addTransaction,
  getTransactions,
  getSummary,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  
} = require("../controllers/transactionController");

const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();
// const router = express.Router();

router.post("/", authenticateUser, addTransaction);
router.get("/", authenticateUser, getTransactions);
router.get("/summary", authenticateUser, getSummary); // 👈 summary pehle aayega
router.get("/:id", authenticateUser, getTransactionById); 
router.put("/:id", authenticateUser, updateTransaction);
router.delete("/:id", authenticateUser, deleteTransaction);

module.exports = router;
