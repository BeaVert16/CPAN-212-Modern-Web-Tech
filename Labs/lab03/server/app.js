const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");

const saveRouter = require("./routers/saveRouter");
const fetchRouter = require("./routers/fetchRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/save", saveRouter);
app.use("/fetch", fetchRouter);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
