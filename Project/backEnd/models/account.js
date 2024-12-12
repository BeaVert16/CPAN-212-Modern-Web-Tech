const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  actualName: {
    type: String,
  },
  accountImage: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("accountsettings", accountSchema);