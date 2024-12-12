const { InfluxDB } = require("@influxdata/influxdb-client");
require("dotenv").config();

const url = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;
const orgID = process.env.INFLUXDB_ORG;

const queryApi = new InfluxDB({ url, token }).getQueryApi(orgID);

async function getBuckets() {
  const bucketsQuery = `buckets()`;
  const buckets = [];
  for await (const { values, tableMeta } of queryApi.iterateRows(
    bucketsQuery
  )) {
    const o = tableMeta.toObject(values);
    if (o.name !== "_monitoring" && o.name !== "_tasks") {
      buckets.push(o.name);
    }
  }
  return buckets;
}

async function calculateAverages() {
  const buckets = await getBuckets();
  const allData = {
    gpuUsage: [],
    diskUsage: [],
    totalUsedSpace: [],
    totalUsedVRAM: [],
    totalUsedRAM: [],
    cpuUsage: [],
  };

  const queries = {
    gpuUsage: (bucket) => `
      from(bucket: "${bucket}")
        |> range(start: -5m)  // Get the data from the past 5 minutes
        |> filter(fn: (r) => r["_measurement"] == "gpu_usage")
        |> filter(fn: (r) => r["_field"] == "gpu_usage")
        |> aggregateWindow(every: 30s, fn: last, createEmpty: false)
        |> yield(name: "last")
    `,
    diskUsage: (bucket) => `
      from(bucket: "${bucket}")
        |> range(start: -5m)
        |> filter(fn: (r) => r["_measurement"] == "disk_usage")
        |> filter(fn: (r) => r["_field"] == "current_usage_percent")
        |> aggregateWindow(every: 30s, fn: last, createEmpty: false)
        |> yield(name: "last")
    `,
    totalUsedSpace: (bucket) => `
      from(bucket: "${bucket}")
        |> range(start: -5m)
        |> filter(fn: (r) => r["_measurement"] == "disk_usage")
        |> filter(fn: (r) => r["_field"] == "used_space")
        |> aggregateWindow(every: 30s, fn: last, createEmpty: false)
        |> yield(name: "last")
    `,
    totalUsedVRAM: (bucket) => `
      from(bucket: "${bucket}")
        |> range(start: -5m)
        |> filter(fn: (r) => r["_measurement"] == "gpu_usage")
        |> filter(fn: (r) => r["_field"] == "used_memory")
        |> aggregateWindow(every: 30s, fn: last, createEmpty: false)
        |> yield(name: "last")
    `,
    totalUsedRAM: (bucket) => `
      from(bucket: "${bucket}")
        |> range(start: -5m)
        |> filter(fn: (r) => r["_measurement"] == "memory_usage")
        |> filter(fn: (r) => r["_field"] == "used_memory")
        |> aggregateWindow(every: 30s, fn: last, createEmpty: false)
        |> yield(name: "last")
    `,
    cpuUsage: (bucket) => `
      from(bucket: "${bucket}")
        |> range(start: -5m)
        |> filter(fn: (r) => r["_measurement"] == "cpu_usage")
        |> filter(fn: (r) => r["_field"] == "value")
        |> aggregateWindow(every: 30s, fn: last, createEmpty: false)
        |> yield(name: "last")
    `,
  };

  for (const bucket of buckets) {
    for (const [key, queryBuilder] of Object.entries(queries)) {
      const query = queryBuilder(bucket);

      for await (const { values, tableMeta } of queryApi.iterateRows(query)) {
        const row = tableMeta.toObject(values);
        if (row._value !== null && row._value !== undefined) {
          allData[key].push(row._value);
        }
      }
    }
  }

  // Calculate results (sum and average for most values)
  const result = {
    gpuUsageAverage:
      allData.gpuUsage.length > 0
        ? allData.gpuUsage.reduce((sum, val) => sum + val, 0) /
          allData.gpuUsage.length
        : 0,
    diskUsageAverage:
      allData.diskUsage.length > 0
        ? allData.diskUsage.reduce((sum, val) => sum + val, 0) /
          allData.diskUsage.length
        : 0,
    totalUsedSpace: allData.totalUsedSpace.reduce((sum, val) => sum + val, 0),
    totalUsedVRAM: allData.totalUsedVRAM.reduce((sum, val) => sum + val, 0),
    totalUsedRAM: allData.totalUsedRAM.reduce((sum, val) => sum + val, 0),
    cpuUsage: allData.cpuUsage.length > 0 ? allData.cpuUsage[0] : 0, // Get the latest CPU usage value
  };

  // Add units to the result
  return {
    gpuUsageAverage: `${result.gpuUsageAverage} %`,
    diskUsageAverage: `${result.diskUsageAverage} %`,
    totalUsedSpace: `${result.totalUsedSpace} GB`,
    totalUsedVRAM: `${result.totalUsedVRAM} GB`,
    totalUsedRAM: `${result.totalUsedRAM} GB`,
    cpuUsage: `${result.cpuUsage} %`,
  };
}

module.exports = { calculateAverages };