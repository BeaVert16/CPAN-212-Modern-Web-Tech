const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const recipeRouter = require("./Router/recipes_router");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", recipeRouter);


app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

mongoose.connect(process.env.MONGODB_KEY), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});