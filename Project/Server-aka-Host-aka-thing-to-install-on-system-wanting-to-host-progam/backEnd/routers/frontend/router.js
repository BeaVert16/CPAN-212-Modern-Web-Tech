const express = require("express");
const app = express();

const average = require("./average")

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

router.use("/get", average) 

module.exports = router;
