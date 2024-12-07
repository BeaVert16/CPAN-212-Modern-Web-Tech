require("dotenv").config();
const PORT = process.env.PORT || 8000;
const BACKEDADDRESS = process.env.BACKEDADDRESS || "http://localhost";
const express = require("express");
const app = express();
const session = require("express-session");


const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const corsConfig = require("./middleware/cors");

const login = require("./routers/login");
const client = require("./routers/client");
const test = require("./routers/test")

const connectMongoDB  = require("./config/mongodb");
const MongoStore = require("connect-mongo");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(corsConfig());


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

//whitelisted
app.use("/auth", login);

app.get("/", (req, res) => {
  res.send("Backend running");
});

//protected

app.use("/client/yonky", client);

app.use("/test",auth, test);



app.listen(PORT, () => {
  console.log(`http://${BACKEDADDRESS}:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});