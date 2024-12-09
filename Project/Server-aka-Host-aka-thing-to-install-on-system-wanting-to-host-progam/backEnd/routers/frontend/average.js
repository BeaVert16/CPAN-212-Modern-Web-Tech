const express = require("express");
const Client = require("../../models/clientRegister");
const { getBucketAverages } = require("../../influx/calAverage");

const router = express.Router();

router.get("/average", async (req, res) => {
  try {
    const clients = await Client.find();

    const stats = {
      total_ram: 0,
      total_storage: 0,
      total_cpu_cores: 0,
      total_cpu_threads: 0,
      total_gpu_memory: 0,
      average_cpu_usage: 0,
      average_gpu_usage: 0,
      used_storage: 0,
    };

    let cpuUsageSum = 0;
    let gpuUsageSum = 0;
    let storageUsedSum = 0;
    let systemsCount = 0;

    for (const client of clients) {
      const { bucket_id, total_ram, cpu, gpu, drives } = client;

      stats.total_ram += parseFloat(total_ram || 0);
      stats.total_cpu_cores += parseInt(cpu.cpu_cores || 0, 10);
      stats.total_cpu_threads += parseInt(cpu.cpu_threads || 0, 10);
      stats.total_gpu_memory += parseFloat(gpu.gpu_total_memory || 0);

      drives.attached_drives.forEach((drive) => {
        stats.total_storage += parseFloat(drive.drive_total_storage || 0);
      });

      // Fetch averages from InfluxDB for the specific bucket
      const influxStats = await getBucketAverages(bucket_id);

      cpuUsageSum += influxStats.average_cpu_usage;
      gpuUsageSum += influxStats.average_gpu_usage;
      storageUsedSum += influxStats.used_storage;

      systemsCount++;
    }

    // Finalize averages
    stats.average_cpu_usage = systemsCount ? cpuUsageSum / systemsCount : 0;
    stats.average_gpu_usage = systemsCount ? gpuUsageSum / systemsCount : 0;
    stats.used_storage = storageUsedSum;

    stats.average_ram = systemsCount ? stats.total_ram / systemsCount : 0;

    res.json(stats);
  } catch (error) {
    console.error("Error calculating averages:", error);
    res.status(500).json({ error: "Failed to calculate averages" });
  }
});

module.exports = router;
