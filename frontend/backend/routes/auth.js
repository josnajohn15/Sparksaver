// backend/routes/auth.js
const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const User    = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "sparkSecret";

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email and password required." });

  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user   = new User({ email, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(201).json({ token, email: user.email });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ msg: "Signup error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email and password required." });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid credentials" });

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, email: user.email });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Login error" });
  }
});

module.exports = router;
