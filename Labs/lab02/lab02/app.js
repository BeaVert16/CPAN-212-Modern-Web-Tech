require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const labRouter = require("./router")
 
 
app.use("/lab2", labRouter)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
 
app.use("", (req, res) => {
  res.status(404).send("Page Not Found");
});
 
 
app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`)
});