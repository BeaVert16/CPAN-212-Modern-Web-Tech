const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Do not create sessions for unauthenticated users
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_KEY,
    collectionName: "sessions",
    ttl: 1000 * 60 * 60 * 24, // Session expiry (in seconds)
  }),
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 },
});

module.exports = sessionMiddleware;