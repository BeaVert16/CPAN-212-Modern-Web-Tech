const express = require("express");
const router = express.Router();

const { fetchGraphData } = require("../../influx/testingthuings/test");

router.get("/test", async (req, res) => {
  try {
    const graphData = await fetchGraphData();
    res.json(graphData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
