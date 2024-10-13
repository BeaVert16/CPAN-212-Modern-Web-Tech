const express = require("express");
const mult = require("multer");
const path = require("path");
const router = express.Router();

const storage = mult.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now();
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});
const upload = mult({ storage: storage });

router.post("/single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.path}`);
});

router.post("/multiple", upload.array("files", 100), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  const filePaths = req.files.map((file) => file.path);
  res.send(`Files uploaded successfully: ${filePaths.join(", ")}`);
});

module.exports = router;
