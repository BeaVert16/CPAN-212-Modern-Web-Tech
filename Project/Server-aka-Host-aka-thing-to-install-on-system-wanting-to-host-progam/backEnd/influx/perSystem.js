const { InfluxDB, flux } = require("@influxdata/influxdb-client");
require("dotenv").config();

const url = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;
const orgID = process.env.INFLUXDB_ORG;

const queryApi = new InfluxDB({ url, token }).getQueryApi(orgID);

const getSystemData = async (bucketName) => {
  try {
    const fluxQuery = flux`
      from(bucket: "${bucketName}")
        |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
        |> filter(fn: (r) => r._measurement == "cpu_usage" 
          or r._measurement == "disk_usage" 
          or r._measurement == "gpu_temperature" 
          or r._measurement == "gpu_usage" 
          or r._measurement == "memory_usage" 
          or r._measurement == "network_usage")
        |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
        |> yield(name: "mean")
    `;

    const stats = {
      average_cpu_usage: 0,
      average_gpu_usage: 0,
      average_gpu_temperature: 0,
      used_storage: 0,
      used_memory: 0,
      network_usage: 0,
    };

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
      if (o._measurement === "gpu_temperature" && o._field === "temperature") {
        stats.average_gpu_temperature = o._value;
      }
      if (o._measurement === "disk_usage" && o._field === "used_space") {
        stats.used_storage = o._value;
      }
      if (o._measurement === "memory_usage" && o._field === "used_memory") {
        stats.used_memory = o._value;
      }
      if (o._measurement === "network_usage" && o._field === "value") {
        stats.network_usage = o._value;
      }
    }

    if (!hasData) {
      console.log(`No data found for system ${systemID}, skipping.`);
      return null;
    }

    return stats;
  } catch (error) {
    console.error(`Error fetching data for system ${systemID}:`, error);
    return null;
  }
};

module.exports = { getSystemData };
