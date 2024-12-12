const { InfluxDB, flux, fluxDuration } = require("@influxdata/influxdb-client");
require("dotenv").config();

const url = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;
const orgID = process.env.INFLUXDB_ORG;

const queryApi = new InfluxDB({ url, token }).getQueryApi(orgID);

const getBucketAverages = async (bucketName) => {
  try {
    const fluxQuery = flux`
        from(bucket: "${bucketName}")
        |> range(start: -1m) 
        |> filter(fn: (r) => r._measurement == "cpu_usage" or r._measurement == "gpu_usage" or r._measurement == "disk_usage" or r._measurement == "memory_usage")
        |> filter(fn: (r) => r._field == "used_space" or r._field == "gpu_usage" or r._field == "used_memory" or r._field == "value")
        |> mean() // Simple aggregation without windowing
        |> yield(name: "mean")
    `;

    const stats = {};

    let hasData = false;

    for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values);
      console.log(`Fetched data for field ${o._field}: ${o._value}`);

      hasData = true;

      if (o._measurement === "cpu_usage" && o._field === "value") {
        stats.average_cpu_usage = o._value;
      }
      if (o._measurement === "gpu_usage" && o._field === "gpu_usage") {
        stats.average_gpu_usage = o._value;
      }
      if (o._measurement === "disk_usage" && o._field === "used_space") {
        stats.used_storage = o._value;
      }
      if (o._measurement === "memory_usage" && o._field === "used_memory") {
        stats.used_memory = o._value;
      }
    }

    if (!hasData) {
      console.log(`No data found for bucket ${bucketName}, skipping.`);
      return null;
    }

    return {
      average_cpu_usage: stats.average_cpu_usage || 0,
      average_gpu_usage: stats.average_gpu_usage || 0,
      used_storage: stats.used_storage || 0,
      used_memory: stats.used_memory || 0,
    };
  } catch (error) {
    console.error(
      `Error fetching InfluxDB averages for bucket ${bucketName}:`,
      error
    );
    return null;
  }
};

module.exports = { getBucketAverages };
