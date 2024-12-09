const express = require("express");
const User = require("../models/account");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const sessionMiddleware = require("../middleware/session");
require("dotenv").config();

router.use(sessionMiddleware);

router.post("/register", async (req, res) => {
  const { username, password, actualName, isAdmin, isPremium } = req.body;

  bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      return newUser.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Account Created" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Error registering user");
    });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Set session data after successful login
    req.session.user = {
      username: user.username,
      isAdmin: user.isAdmin,
      isPremium: user.isPremium,
    };

    return res
      .status(200)
      .json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/session-check", auth.checkSession);

module.exports = router;
