const express = require("express");
const router = express.Router();
const generateClientId = require("../components/idMaker");

const Client = require("../models/clientRegister");
const Heartbeat = require("../models/heartBeat");

const { createBucket } = require("../influx/createBucket");
const { writeData } = require("../influx/writeData");
const { getBucketId } = require("../influx/getBucketID");

router.post("/register", async (req, res) => {
  console.log("Somethings Going On, Working???");
  try {
    const {
      attached_drives,
      cpu_info,
      gpu_info,
      network_adapters,
      os_name,
      os_version,
      system_name,
      total_ram,
      uptime,
      total_storage_space,
    } = req.body;

    const cpu = {
      cpu_name: cpu_info[0]?.name || "Unknown CPU",
      cpu_cores: cpu_info[0]?.core_count.toString() || "0",
      cpu_threads: cpu_info[0]?.logical_processors.toString() || "0",
    };

    const gpu =
      gpu_info && gpu_info.length > 0
        ? {
            gpu_name: gpu_info[0]?.name || "Unknown GPU",
            gpu_total_memory: gpu_info[0]?.total_memory.toString() || "0",
          }
        : null;

    const network = {
      ip_address: network_adapters[0]?.ip || "Unknown IP",
      mac_address: network_adapters[0]?.mac || "Unknown MAC",
    };

    const drives = {
      attached_drives: attached_drives.map((drive) => ({
        drive_letter: drive.drive_letter,
        drive: drive.model,
        drive_total_storage: drive.size,
      })),
    };

    const clientId = await generateClientId();

    let bucketResponse;
    try {
      bucketResponse = await createBucket(clientId);
    } catch (error) {
      console.error("Error creating bucket:", error);
      return res
        .status(500)
        .json({ message: "Failed to create bucket", error: error.message });
    }

    let bucket_id;
    try {
      bucket_id = await getBucketId(clientId);
    } catch (error) {
      console.error("Error getting bucket id:", error);
      return res
        .status(500)
        .json({ message: "Failed to get bucket id", error: error.message });
    }

    const newClient = new Client({
      client_id: clientId,
      bucket_id: bucket_id,
      system_name,
      total_ram: total_ram.toString(),
      os_info: `${os_name}`,
      cpu,
      gpu,
      network,
      drives,
      total_storage_space,
    });

    await newClient.save();

    res.status(201).json({
      message: "Client registered successfully",
      client_id: clientId,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Error registering client",
      error: error.message,
    });
  }
});

router.post("/collection", async (req, res) => {
  const { client_id, metrics } = req.body;
  const flattenedMetrics = metrics.metrics || metrics;

  try {
    const client = await Client.findOne({ client_id }).lean();
    if (!client) return res.status(404).json({ error: "No Bucket Found" });

    await Promise.all([
      writeData(client.bucket_id, flattenedMetrics),
      Heartbeat.updateOne(
        { client_id },
        { $set: { timestamp: new Date() } },
        { upsert: true }
      ),
    ]);

    res.json({ message: "Data written successfully" });
  } catch (error) {
    console.error("Error writing data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
