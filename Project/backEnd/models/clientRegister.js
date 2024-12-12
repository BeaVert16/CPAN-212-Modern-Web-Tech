const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cpuSchema = new Schema({
  cpu_name: {
    type: String,
    required: true,
  },
  cpu_cores: {
    type: String,
    required: true,
  },
  cpu_threads: {
    type: String,
    required: true,
  },
});

const gpuSchema = new Schema({
  gpu_name: {
    type: String,
  },
  gpu_total_memory: {
    type: String,
  },
});

const networkSchema = new Schema({
  ip_address: {
    type: String,
    required: true,
  },
  mac_address: {
    type: String,
    required: true,
  },
});

const perdriveSchema = new Schema({
  drive_letter: {
    type: String,
    required: true,
  },
  drive: {
    type: String,
    required: true,
  },
  drive_total_storage: {
    type: Number,
    required: true,
  },
});

const driveSchema = new Schema({
  attached_drives: [perdriveSchema],
});

const clientSchema = new Schema({
  client_id: {
    type: String,
    required: true,
    unique: true,
  },
  bucket_id: {
    type: String,
    required: true,
    unique: true,
  },
  system_name: {
    type: String,
  },
  total_ram: {
    type: String,
  },
  os_info: {
    type: String,
  },
  cpu: cpuSchema,        
  gpu: gpuSchema,        
  network: networkSchema,
  drives: driveSchema,
  total_storage_space: {
    type: String,
  },

  bucket_nane: {
    type: String
  }  
});

module.exports = mongoose.model("clients", clientSchema);