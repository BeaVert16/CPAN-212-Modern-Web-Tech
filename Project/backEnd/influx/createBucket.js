const { InfluxDB, HttpError } = require("@influxdata/influxdb-client");
const { OrgsAPI } = require("@influxdata/influxdb-client-apis");
const axios = require("axios");
require("dotenv").config();

url = process.env.INFLUXDB_HOST
org = process.env.INFLUXDB_ORG_NAME
token = process.env.INFLUXDB_TOKEN
const influxDB = new InfluxDB({url, token})

async function createBucket(name) {
  console.log("*** Get organization by name ***");
  const orgsAPI = new OrgsAPI(influxDB);
  const organizations = await orgsAPI.getOrgs({ org });
  if (!organizations || !organizations.orgs || !organizations.orgs.length) {
    console.error(`No organization named "${org}" found!`);
    return;
  }
  const orgID = organizations.orgs[0].id;
  console.log(`Using organization "${org}" identified by "${orgID}"`);

  console.log(`*** Create Bucket "${name}" ***`);
  try {
    const response = await axios.post(
      `${url}/api/v2/buckets`,
      {
        orgID: orgID,
        name: name,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating bucket:", error);
    throw error;
  }
}

module.exports = { createBucket };
