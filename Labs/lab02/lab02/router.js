const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("lab 02 router");
});

router.get("/name", (req, res) => {
  res.send("Alexander");
});

router.get("/greeting", (req, res) => {
  res.send("Hello there!");
});

router.get("/add/:x/:y", (req, res) => {
  console.log(req.params);
  let x = parseFloat(req.params.x);
  let y = parseFloat(req.params.y);
  res.send(JSON.stringify(x + y));
});

router.get("/calculate/:x/:y/:z", (req, res) => {
  console.log(req.params);
  let x = parseFloat(req.params.x);
  let y = parseFloat(req.params.y);
  let z = req.params.z;

  switch (z) {
    case "+":
      res.send(JSON.stringify(x + y));

      break;
    case "-":
      res.send(JSON.stringify(x - y));

      break;
    case "*":
      res.send(JSON.stringify(x * y));

      break;
    case "/":
      res.send(JSON.stringify(x / y));

      break;
    case "**":
      res.send(JSON.stringify(x ** y));

      break;
    default:
        res.send("Womp Womp")
      break;
  }
});

module.exports = router;
