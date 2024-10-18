const express = require("express");
const router = express.Router();

const information = [
  {
    Name: "Alexander Penha",
    Location: "Vaughan, ON",
    Occupation: "Currently Studying at Humber Polytechnic",
    PhoneNum: "647-647-6477",
    Email: "myrealemail@bongocat.dev",
    GitHub:"https://github.com/BeaVert16"
  },
];

router.get("/getInformation", (req, res) => {
  res.json(information);
});

module.exports = router;
