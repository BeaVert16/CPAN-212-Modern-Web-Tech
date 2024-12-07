// const { createBucket, writeData } = require('./influxtest.js');

import { createBucket, writeData } from "./influxtest.js";

(async () => {
  const bucketName = 'test_bucket';
  await createBucket(bucketName);
  await writeData(bucketName);
})();
