const express = require("express");
const Client = require("../../models/clientRegister");
const Heartbeat = require("../../models/heartBeat");
const moment = require("moment");
const { getSystemData } = require("../../influx/perSystem");
const { getSystemHistory } = require("../../influx/perSystemHistory");

const router = express.Router();

async function findClientById(clientId) {
  return Client.findOne({ client_id: clientId }).lean();
}

router.get("/list", async (req, res) => {
  try {
    const systems = await Client.find(
      {},
      "system_name network.ip_address client_id"
    );

    const systemsWithStatus = await Promise.all(
      systems.map(async (system) => {
        const heartbeat = await Heartbeat.findOne({
          client_id: system.client_id,
        }).sort({ timestamp: -1 });

        const isOnline = heartbeat
          ? moment().diff(moment(heartbeat.timestamp), "minutes") <= 2
          : false;

        return {
          ...system.toObject(),
          is_online: isOnline,
        };
      })
    );

    res.json(systemsWithStatus);
  } catch (error) {
    console.error("Error fetching systems:", error);
    res.status(500).json({ message: "Error fetching systems" });
  }
});

router.get("/system-static/:clientId", async (req, res) => {
  const { clientId } = req.params;

  try {
    const client = await findClientById(clientId);
    if (!client) {
      return res.status(404).json({ error: "No System Found" });
    }

    const clientInfo = {
      system_name: client.system_name,
      total_ram: client.total_ram,
      os_info: client.os_info,
      cpu_name: client.cpu.cpu_name,
      gpu_name: client.gpu.gpu_name,
      gpu_total_memory: client.gpu.gpu_total_memory,
      total_storage_space: client.total_storage_space,
      ip_address: client.network.ip_address,
      mac_address: client.network.mac_address,
      drives: client.drives.attached_drives,
    };

    res.json({
      type: "static",
      data: clientInfo,
    });
  } catch (error) {
    console.error("Error fetching static system data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/system-dynamic/:clientId", async (req, res) => {
  const { clientId } = req.params;

  try {
    const client = await findClientById(clientId);
    if (!client) {
      return res.status(404).json({ error: "No System Found" });
    }

    const systemData = await getSystemData(clientId);
    if (!systemData) {
      return res.status(404).json({ error: "No Data Found in InfluxDB" });
    }

    res.json({
      type: "dynamic",
      data: systemData,
    });
  } catch (error) {
    console.error("Error fetching dynamic system data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/system-history/:clientId", async (req, res) => {
  const { clientId } = req.params;

  try {
    const client = await findClientById(clientId);
    if (!client) {
      return res.status(404).json({ error: "No System Found" });
    }

    const systemData = await getSystemHistory(clientId);
    if (!systemData) {
      return res.status(404).json({ error: "No Data Found in InfluxDB" });
    }

    res.json({ systemData });
  } catch (error) {
    console.error("Error fetching dynamic system data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
