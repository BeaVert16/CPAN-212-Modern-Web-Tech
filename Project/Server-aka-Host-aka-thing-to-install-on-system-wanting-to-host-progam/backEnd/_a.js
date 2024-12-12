// const { InfluxDB, flux } = require("@influxdata/influxdb-client");
// const { MongoClient } = require("mongodb");
// const cron = require("node-cron");
// require("dotenv").config();

// const influxUrl = process.env.INFLUXDB_HOST;
// const influxToken = process.env.INFLUXDB_TOKEN;
// const influxOrgID = process.env.INFLUXDB_ORG;
// const mongoUrl = process.env.MONGODB_KEY;

// const influxQueryApi = new InfluxDB({
//   url: influxUrl,
//   token: influxToken,
// }).getQueryApi(influxOrgID);
// const mongoClient = new MongoClient(mongoUrl);

// const exportDataToMongoDB = async () => {
//   try {
//     await mongoClient.connect();
//     const database = mongoClient.db("myDatabase");
//     const collection = database.collection("myCollection");

//     const bucketsQuery = flux`buckets()`;
//     const buckets = [];

//     for await (const { values, tableMeta } of influxQueryApi.iterateRows(
//       bucketsQuery
//     )) {
//       const bucket = tableMeta.toObject(values);
//       buckets.push(bucket.name);
//     }

//     for (const bucketName of buckets) {
//       const fluxQuery = flux`
//         from(bucket: "${bucketName}")
//           |> range(start: -1d) 
//           |> filter(fn: (r) => r._measurement == "usage")
//           |> group(columns: ["_field"])
//           |> mean()`;

//       const data = [];

//       for await (const { values, tableMeta } of influxQueryApi.iterateRows(
//         fluxQuery
//       )) {
//         const o = tableMeta.toObject(values);
//         console.log(
//           `Fetched data for field ${o._field} in bucket ${bucketName}: ${o._value}`
//         );
//         data.push({ ...o, bucket: bucketName });
//       }

//       if (data.length > 0) {
//         const result = await collection.insertMany(data);
//         console.log(
//           `${result.insertedCount} documents were inserted from bucket ${bucketName}.`
//         );
//       } else {
//         console.log(`No data to insert for bucket ${bucketName}.`);
//       }
//     }
//   } catch (error) {
//     console.error("Error exporting data to MongoDB:", error);
//   } finally {
//     await mongoClient.close();
//   }
// };

// cron.schedule("0 * * * *", () => {
//   console.log("Running scheduled task to export data from InfluxDB to MongoDB");
//   exportDataToMongoDB();
// });

// exportDataToMongoDB();
