const express = require("express");
const mongoose = require("mongoose");
const { InfluxDB, Point, HttpError } = require("@influxdata/influxdb-client");
const axios = require("axios");
const System = require("./models/system");

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/systems", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// InfluxDB Connection
const influxDB = new InfluxDB({
  url: "http://localhost:8086",
  token: "your-influxdb-token",
});
const org = "your-org-name";

// Function to create a bucket in InfluxDB
async function createBucket(bucketName) {
  try {
    const bucketsAPI = new influxDB.BucketsAPI();
    const existingBuckets = await bucketsAPI.getBuckets({ name: bucketName });

    if (existingBuckets.buckets.length === 0) {
      await bucketsAPI.postBuckets({
        orgID: (await influxDB.OrgsAPI().getOrgs({ org })).orgs[0].id,
        name: bucketName,
        retentionRules: [{ type: "expire", everySeconds: 30 * 24 * 3600 }], // Retention of 30 days
      });
      console.log(`Bucket ${bucketName} created.`);
    } else {
      console.log(`Bucket ${bucketName} already exists.`);
    }
  } catch (error) {
    console.error(
      "Error creating bucket:",
      error instanceof HttpError ? error.body : error.message
    );
  }
}

// Periodically Collect Data and Store
setInterval(async () => {
  const systems = await System.find();

  for (const system of systems) {
    const bucketName = `${system.hostname}_${system.macAddress}_${system.ipAddress}`;

    await createBucket(bucketName);

    // Collect data from API (mocked here as an example)
    const apiData = await axios
      .get("https://api.example.com/data")
      .then((res) => res.data);

    // Write data to InfluxDB
    const writeApi = influxDB.getWriteApi(org, bucketName);
    const point = new Point("system_metrics")
      .tag("hostname", system.hostname)
      .tag("macAddress", system.macAddress)
      .tag("ipAddress", system.ipAddress)
      .floatField("cpuUsage", apiData.cpuUsage)
      .floatField("memoryUsage", apiData.memoryUsage);

    try {
      writeApi.writePoint(point);
      await writeApi.close();
      console.log(`Data written to bucket ${bucketName}`);
    } catch (error) {
      console.error("Error writing data to InfluxDB:", error.message);
    }
  }
}, 10000); // Every 10 seconds

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
