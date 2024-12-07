require("dotenv").config();
const PORT = process.env.PORT || 8000;
const BACKEDADDRESS = process.env.BACKEDADDRESS || "http://localhost";
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");

const logger = require("./middleware/logger");

const login = require("./routers/login");
const client = require("./routers/client");
const test = require("./routers/test")

const connectMongoDB  = require("./config/mongodb");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://192.168.") || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const MongoStore = require("connect-mongo");
connectMongoDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_KEY,
      collectionName: "sessions",
      ttl: 1000 * 60 * 60 * 24, // this is time in seconds -> so 5 seconds (ttl: time to live)
    }),
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 },
  })
);

app.use("/auth", login);

app.use("/client/yonky", client);

app.use("/test", test);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () => {
  console.log(`http://${BACKEDADDRESS}:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});