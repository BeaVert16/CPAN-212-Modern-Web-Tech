require("dotenv").config();
const PORT = process.env.PORT || 8000;
const BACKEDADDRESS = process.env.BACKEDADDRESS || "http://localhost";
const express = require("express");
const app = express();
const cors = require("cors");

const logger = require("./middleware/logger");

const login = require("./routers/login");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://192.168.")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);




const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

mongoose.connect(process.env.MONGODB_KEY),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

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

app.get("/test-session", (req, res) => {
  console.log(req.session)
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>Views: " + req.session.views + "</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("Welcome to the session demo. Refresh!");
  }
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () => {
  console.log(`http://${BACKEDADDRESS}:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
