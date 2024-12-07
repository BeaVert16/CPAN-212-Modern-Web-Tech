const express = require("express");
const User = require("../models/account");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
require("dotenv").config();

router.post("/register", (req, res) => {
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
    const user_account = await User.findOne({ username });
    if (!user_account) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user_account.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    req.session.user = {
      username: user_account.username,
      isAdmin: user_account.isAdmin,
      isPremium: user_account.isPremium,
    };
    console.log("Session data:", req.session);

    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.error("Error during login process: ", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/session-check", auth);

module.exports = router;
