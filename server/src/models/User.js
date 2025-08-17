const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,   // removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // adds createdAt, updatedAt automatically

const User = mongoose.model("User", userSchema);

module.exports = User;
