const express = require("express");
const router = express.Router();

//ok so.... since this is fictional I asked the all mighty to make some info for me
const experience = [
  {
    Place: "Tech Innovations Inc.",
    Title: "Software Developer",
    Description:
      "Developed and maintained web applications using React and Node.js, collaborated with cross-functional teams to deliver high-quality software solutions.",
    Year: "2019-2021",
  },
  {
    Place: "Green Earth Solutions",
    Title: "Project Manager",
    Description:
      "Led a team in the development of sustainable energy projects, managed timelines, budgets, and stakeholder communications to ensure successful project completion.",
    Year: "2021-2023",
  },
  {
    Place: "Global Finance Corp.",
    Title: "Data Analyst",
    Description:
      "Analyzed financial data to provide insights for business strategies, created visual reports and dashboards using Tableau and Excel.",
    Year: "2023-Present",
  },
];

router.get("/getExp", (req, res) => {
  if (experience.length === 0) {
    return res.json("No Current Real World Work Experience :(.");
  }
  res.json(experience);
});

module.exports = router;
