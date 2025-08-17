const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();

const app = express();

// middlewares
app.use(cors({ origin: true, credentials: true })); // will refine later to your React port
app.use(express.json());

app.use("/api/auth" , authRoutes);

// health route (for quick testing)
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Server is healthy" });
});

// connect DB then start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
