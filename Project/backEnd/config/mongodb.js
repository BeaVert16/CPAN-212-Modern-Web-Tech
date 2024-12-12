const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_KEY)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
};

module.exports = connectMongoDB;
