require("dotenv").config();
import { InfluxDBClient, Point} from '@influxdata/influxdb3-client'

const influxDB = new InfluxDBClient({
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
});

const createBucket = async (bucketName) => {
  const { BucketsAPI } = require("@influxdata/influxdb-client-apis");
  const bucketsAPI = new BucketsAPI(influxDB);

  const orgID = process.env.INFLUXDB_ORG_ID;

  try {
    const buckets = await bucketsAPI.getBuckets({ orgID });
    if (!buckets.buckets.some((bucket) => bucket.name === bucketName)) {
      await bucketsAPI.postBuckets({
        body: {
          orgID,
          name: bucketName,
          retentionRules: [],
        },
      });
      console.log(`Bucket ${bucketName} created`);
    }
  } catch (err) {
    console.error("Error creating bucket:", err.message);
  }
};

const writeData = async (bucketName) => {
  const writeApi = influxDB.getWriteApi(process.env.INFLUXDB_ORG_ID, bucketName);
  const point = new Point('test_measurement')
    .tag('location', 'test')
    .intField('value', 42);

  try {
    writeApi.writePoint(point);
    await writeApi.close();
    console.log('Data written successfully');
  } catch (err) {
    console.error('Error writing data:', err.message);
  }
};

module.exports = { influxDB, createBucket, writeData };
