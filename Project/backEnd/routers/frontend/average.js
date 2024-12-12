const express = require("express");
const Client = require("../../models/clientRegister");
const { calculateAverages } = require("../../influx/getAverage");

const router = express.Router();

async function fetchMongoDBData() {
  const stats = {
    total_ram: 0,
    total_storage: 0,
    total_cpu_cores: 0,
    total_cpu_threads: 0,
    total_gpu_memory: 0,
    client_count: 0,
  };

  stats.client_count = await Client.countDocuments();

  const clients = await Client.find();

  clients.forEach((client) => {
    const { total_ram = 0, cpu = {}, gpu = {}, drives = {} } = client;

    stats.total_ram += parseFloat(total_ram) / 1024;

    stats.total_cpu_cores += parseInt(cpu.cpu_cores || 0, 10);
    stats.total_cpu_threads += parseInt(cpu.cpu_threads || 0, 10);

    stats.total_gpu_memory +=
      parseFloat(gpu.gpu_total_memory || 0) / (1024 * 1024 * 1024);

    if (Array.isArray(drives.attached_drives)) {
      drives.attached_drives.forEach((drive) => {
        stats.total_storage += parseFloat(drive.drive_total_storage || 0);
      });
    }
  });

  if (stats.total_storage >= 1000) {
    stats.total_storage = `${(stats.total_storage / 1000).toFixed(1)} TB`;
  } else {
    stats.total_storage = `${stats.total_storage.toFixed(1)} GB`;
  }

  return stats;
}

router.get("/mongo-data", async (req, res) => {
  try {
    const mongoData = await fetchMongoDBData();
    res.json(mongoData);
  } catch (error) {
    console.error("Error fetching MongoDB data:", error.message);
    res.status(500).json({ error: "Failed to fetch MongoDB data" });
  }
});

router.get("/average", async (req, res) => {
  try {
    const influxdata = await calculateAverages();
    res.json(influxdata);
  } catch (error) {
    console.error("Error fetching MongoDB data:", error.message);
    res.status(500).json({ error: "Failed to fetch MongoDB data" });
  }
});

module.exports = router;
