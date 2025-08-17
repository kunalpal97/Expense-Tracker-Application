const User = require("../models/User");

// @desc   Register a new user
// @route  POST /api/auth/signup
// @access Public
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user (plain password for now)
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully 🎉",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Login existing user
// @route  POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 0) basic validation (client ne empty na bheja ho)
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1) user dhoondo (email lower-case safe side)
    const user = await User.findOne({ email: String(email).toLowerCase() });

    // 2) user na mile ya password mismatch -> same generic msg (security best practice)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3) success -> minimal public profile
    return res.json({
      message: "Login successful 🎉",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { signupUser , loginUser };
