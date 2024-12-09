const { InfluxDB, flux } = require('@influxdata/influxdb-client');
require("dotenv").config();

const url = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;
const orgID = process.env.INFLUXDB_ORG;

const queryApi = new InfluxDB({ url, token }).getQueryApi(orgID);

const getBucketAverages = async (bucketId) => {
  try {
    const fluxQuery = flux`
      from(bucket: "${bucketId}")
        |> range(start: -1d) 
        |> filter(fn: (r) => r._measurement == "usage")
        |> group(columns: ["_field"])
        |> mean()`;

    const stats = {};

    for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
      const o = tableMeta.toObject(values);
      console.log(`Fetched data for field ${o._field}: ${o._value}`);

      stats[o._field] = o._value;
    }

    return {
      average_cpu_usage: stats["cpu_usage"] || 0,
      average_gpu_usage: stats["gpu_usage"] || 0,
      used_storage: stats["used_storage"] || 0,
    };
  } catch (error) {
    console.error(`Error fetching InfluxDB averages for bucket ${bucketId}:`, error);
    return {
      average_cpu_usage: 0,
      average_gpu_usage: 0,
      used_storage: 0,
    };
  }
};

module.exports = { getBucketAverages };
