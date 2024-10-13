const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const path = require("path");
const mult = require("multer");
const fs = require("fs")
const _ = require("lodash")

const storage = mult.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now();
    cb(null, uniquePrefix + "-" +file.originalname);
  },
});

const upload = mult({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.post("/register",upload.single("file"), (req, res) => {
  console.log(req.body);
  res.send("i got your your information");
});
app.get("/fetch/single", (req, res) => {
    const files_array = fs.readdirSync(path.join(__dirname, 'uploads'))
    console.log(files_array)
    if (files_array.length == 0){
        return res.send("empty")
    }
    let random_file = _.sample(files_array)
    res.sendFile(path.join(__dirname, 'uploads',random_file))
});

app.get("/fetch/multiple", (req, res) => {
    const files_array = fs.readdirSync(path.join(__dirname, 'uploads'))
    console.log(files_array)
    if (files_array.length == 0){
        return res.send("empty")
    }
    let random_file = _.sampleSize(files_array,3)
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
