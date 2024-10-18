const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");

const educationRouter = require("./routers/educationRouter");
const experienceRouter = require("./routers/experienceRouter");
const overviewRouter = require("./routers/overviewRouter");
const informationRouter = require("./routers/informationRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", educationRouter);
app.use("/api", experienceRouter);
app.use("/api", overviewRouter);
app.use("/api", informationRouter);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
