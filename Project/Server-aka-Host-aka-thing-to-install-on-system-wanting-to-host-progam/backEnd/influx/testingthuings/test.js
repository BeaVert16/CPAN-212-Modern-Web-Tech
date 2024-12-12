const { InfluxDB } = require("@influxdata/influxdb-client");
require("dotenv").config();

const url = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;
const orgID = process.env.INFLUXDB_ORG;

const queryApi = new InfluxDB({ url, token }).getQueryApi(orgID);

async function getSystemData(bucketName) {
  const query = `
    from(bucket: '${bucketName}')
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] in [
           "cpu_usage", "disk_usage", "gpu_temperature", "gpu_usage", "memory_usage", "network_usage"])
      |> aggregateWindow(every: 1m, fn: mean, createEmpty: false)
      |> group(columns: ["_measurement", "_field", "device"])
      |> yield(name: "mean")
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

module.exports = { getSystemData };
