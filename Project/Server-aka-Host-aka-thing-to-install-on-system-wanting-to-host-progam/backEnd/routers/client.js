const express = require("express");
const router = express.Router();

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

module.exports = router;
