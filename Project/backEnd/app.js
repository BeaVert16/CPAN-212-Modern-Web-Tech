require("dotenv").config();
const PORT = process.env.PORT || 8000;
const BACKEDADDRESS = process.env.BACKEDADDRESS || "http://localhost";
const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const corsConfig = require("./middleware/cors");

const login = require("./routers/login");
const client = require("./routers/client");
// const test = require("./routers/test");
const api = require("./routers/frontend/router");

const connectMongoDB = require("./config/mongodb");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(corsConfig());

connectMongoDB();

//whitelisted
app.use("/auth", login);

app.get("/", (req, res) => {
  res.send("Backend running");
});

//protected

app.use("/client/yonky", client);

// app.use("/test", test);

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`http://${BACKEDADDRESS}:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
