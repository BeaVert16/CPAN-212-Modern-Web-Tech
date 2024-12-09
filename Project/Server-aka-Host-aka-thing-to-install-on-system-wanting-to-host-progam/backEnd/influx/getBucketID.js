require("dotenv").config();
const { InfluxDB } = require("@influxdata/influxdb-client");
const { BucketsAPI } = require("@influxdata/influxdb-client-apis");

const url = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;
const orgID = process.env.INFLUXDB_ORG;

const influxDB = new InfluxDB({ url, token });
const bucketsAPI = new BucketsAPI(influxDB);

async function getBucketId(bucketName) {
  try {
    const buckets = await bucketsAPI.getBuckets({ orgID });
    const bucket = buckets.buckets.find((b) => b.name === bucketName);
    if (bucket) {
      console.log(`Bucket ID for ${bucketName}: ${bucket.id}`);
      return bucket.id;
    } else {
      console.log(`Bucket ${bucketName} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving bucket ID:", error.message);
    return null;
  }
}

module.exports = { getBucketId };
