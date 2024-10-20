const express = require("express");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const router = express.Router();

router.get("/single", (req, res) => {
  let files_array = fs.readdirSync(path.join(__dirname, "../uploads"));
  if (files_array.length == 0) {
    return res.status(503).send({
      message: "No images",
    });
  }
  let filename = _.sample(files_array);
  res.sendFile(path.join(__dirname, "../uploads", filename));
});

router.get("/multiple", (req, res) => {
  let filesArray = fs.readdirSync(path.join(__dirname, "../uploads"));
  if (filesArray.length == 0) {
    return res.status(503).send({
      message: "No images",
    });
  }

  let filenames = _.sampleSize(filesArray, 3);

  const fileData = filenames.map((filename) => {
    const filePath = path.join(__dirname, "../uploads", filename);
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString("base64");

    return {
      filename,
      data: base64Data,
    };
  });
  res.json({
    files: fileData,
  });
});

router.get("/randomDog", async (req, res) => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(data.message);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
});
module.exports = router;
