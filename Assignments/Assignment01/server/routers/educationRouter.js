const express = require("express");
const router = express.Router();

const education = [
  {
    Degree: "Diploma",
    Institution: "Humber Polytechnic",
    Program: "Computer Programming",
    Year: "Current",
  },
  {
    Degree: "Masters",
    Institution: "Queens University",
    Program: "Accounting",
    Year: "2003-2007",
  },
  {
    Degree: "PhD",
    Institution: "University of Toronto",
    Program: "Anthropology",
    Year: "2008-2010",
  },
];

router.get("/getEdu", (req, res) => {
  res.json(education);
});

module.exports = router;
