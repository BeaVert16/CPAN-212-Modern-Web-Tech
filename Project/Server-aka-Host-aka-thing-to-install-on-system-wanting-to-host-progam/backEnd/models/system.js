const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema({
    hostname: {
        type: String,
        required: true,
        trim: true
    },
    cpuType: {
        type: String,
        required: true,
        trim: true
    },
    macAddress: {
        type: String,
        required: true,
        trim: true
    },
    influxBucket: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("systems", systemSchema);
