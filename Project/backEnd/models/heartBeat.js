const mongoose = require("mongoose");

const heartbeatSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("heartbeat", heartbeatSchema);