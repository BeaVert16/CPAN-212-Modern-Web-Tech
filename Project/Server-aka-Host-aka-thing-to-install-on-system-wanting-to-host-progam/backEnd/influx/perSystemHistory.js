const { InfluxDB } = require("@influxdata/influxdb-client");
require("dotenv").config();

const url = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;
const orgID = process.env.INFLUXDB_ORG;

const queryApi = new InfluxDB({ url, token }).getQueryApi(orgID);

async function getSystemHistory(bucketName) {
  const query = `
  from(bucket: "${bucketName}")
    |> range(start: -24h)
    |> filter(fn: (r) => r["_measurement"] == "cpu_usage" or r["_measurement"] == "disk_usage" or r["_measurement"] == "gpu_temperature" or r["_measurement"] == "gpu_usage" or r["_measurement"] == "memory_usage" or r["_measurement"] == "network_usage")
    |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
    |> group(columns: ["_measurement", "_field", "device"])
    |> yield(name: "last")
  `;

  const graphData = {};

  for await (const { values, tableMeta } of queryApi.iterateRows(query)) {
    const row = tableMeta.toObject(values);

    const {
      _measurement: measurement,
      _field: field,
      device = "default_device",
      _time: timestamp,
      _value: value,
    } = row;

    if (!graphData[measurement]) {
      graphData[measurement] = {};
    }

    if (!graphData[measurement][device]) {
      graphData[measurement][device] = [];
    }

    graphData[measurement][device].push({
      timestamp,
      field,
      value: value || 0,
    });
  }

  return graphData;
}

module.exports = { getSystemHistory };
