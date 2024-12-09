const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", CounterSchema);

const generateClientId = async () => {
  const counter = await Counter.findOneAndUpdate(
    {}, 
    { $inc: { seq: 1 } }, 
    { new: true, upsert: true } 
  );

  const uniqueNumber = counter.seq.toString().padStart(6, "0");
  return `MCC_${uniqueNumber}`;
};

module.exports = generateClientId;
