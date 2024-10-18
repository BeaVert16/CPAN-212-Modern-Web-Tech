const express = require("express");
const router = express.Router();

const overview = [
  {
    Description:
      "I'm professional programmer that strikes fear in any programming language I use. With a passion for problem-solving and a knack for tackling complex challenges, I thrive in dynamic environments where innovation is key. I take pride in writing clean, efficient code and have a deep understanding of algorithms and data structures. Whether I'm developing scalable web applications or optimizing backend systems, I approach every project with meticulous attention to detail and a commitment to excellence. ",
  },
];

router.get("/getOverview", (req, res) => {
  res.json(overview);
});

module.exports = router;
