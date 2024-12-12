const express = require("express");
const app = express();

const average = require("./average");
const getlis = require("./getlist");
const chart = require("./charts")

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

router.use("/get", average);

router.use("/systems", getlis);

router.use("/charts", chart);

module.exports = router;
