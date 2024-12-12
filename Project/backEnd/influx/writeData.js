const { InfluxDB, Point } = require("@influxdata/influxdb-client");
require("dotenv").config();

const influxDB = new InfluxDB({
  url: process.env.INFLUXDB_HOST,
  token: process.env.INFLUXDB_TOKEN,
});

const writeData = async (bucket_id, data) => {
  const {
    cpu_usage,
    disk_usage,
    gpu_temperature,
    gpu_usage,
    memory_usage,
    network_usage,
  } = data;

  try {
    const writeApi = influxDB.getWriteApi(
      process.env.INFLUXDB_ORG,
      bucket_id,
      "ns"
    );

    const points = [];
    if (cpu_usage !== undefined) {
      points.push(new Point("cpu_usage").floatField("value", cpu_usage));
    }

    if (disk_usage) {
      disk_usage.forEach((disk) => {
        points.push(
          new Point("disk_usage")
            .tag("drive", disk.drive)
            .floatField("current_usage_percent", disk.current_usage_percent)
            .intField("used_space", disk.used_space)
        );
      });
    }

    if (gpu_temperature) {
      gpu_temperature.forEach((temp, index) => {
        points.push(
          new Point("gpu_temperature")
            .tag("gpu_index", index)
            .intField("value", temp)
        );
      });
    }

    if (gpu_usage) {
      gpu_usage.forEach((gpu, index) => {
        points.push(
          new Point("gpu_usage")
            .tag("gpu_index", index)
            .floatField("gpu_usage", gpu.gpu_usage)
            .intField("used_memory", gpu.used_memory)
        );
      });
    }

    if (memory_usage) {
      points.push(
        new Point("memory_usage")
          .floatField("free_memory", memory_usage.free_memory)
          .floatField("used_memory", memory_usage.used_memory)
      );
    }

    if (network_usage) {
      network_usage.forEach((adapter) => {
        points.push(
          new Point("network_usage")
            .tag("adapter_name", adapter.adapter_name)
            .intField("bytes_received", adapter.bytes_received)
            .intField("bytes_sent", adapter.bytes_sent)
        );
      });
    }

    writeApi.writePoints(points);
    await writeApi.close();
  } catch (error) {
    throw new Error(`Error writing data to InfluxDB: ${error.message}`);
  }
};

module.exports = { writeData };
