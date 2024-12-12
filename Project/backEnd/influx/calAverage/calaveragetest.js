const { InfluxDB, flux} = require("@influxdata/influxdb-client");
require("dotenv").config();

const url = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;
const orgID = process.env.INFLUXDB_ORG;

const queryApi = new InfluxDB({ url, token }).getQueryApi(orgID);

const getBucketAverages = async (bucket) => {
  const fluxQuery = flux`
    from(bucket: "${bucket}")
      |> range(start: -1m)
      |> filter(fn: (r) => r._measurement == "cpu_usage" or r._measurement == "gpu_usage" or r._measurement == "disk_usage" or r._measurement == "network_usage")
      |> mean()
  `;

  try {
    const data = [];
    await queryApi.collectRows(fluxQuery, (row) => {
      data.push(row);
    });

    const averages = data.reduce((acc, row) => {
      const { _measurement, _value } = row;
      if (!acc[_measurement]) {
        acc[_measurement] = { sum: 0, count: 0 };
      }
      acc[_measurement].sum += _value;
      acc[_measurement].count += 1;
      return acc;
    }, {});

    return Object.keys(averages).reduce((acc, key) => {
      acc[key] = averages[key].sum / averages[key].count;
      return acc;
    }, {});
  } catch (error) {
    throw new Error(`Error querying InfluxDB: ${error.message}`);
  }
};

module.exports = { getBucketAverages };
