const express = require('express');
const router = express.Router();
const { createBucket } = require('../influx/createBucket.js');

// Route to create a new bucket
router.post('/create-bucket', async (req, res) => {
  const bucketName = 'test2';  // Ensure this is a string

  try {
    const result = await createBucket(bucketName);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;