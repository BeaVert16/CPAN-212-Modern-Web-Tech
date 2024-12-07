const { writeData } = require('./testdatasendinflux');  // Adjust the path to where your functions are
const testData = [
  {
    "cpu_type": "Intel64 Family 6 Model 183 Stepping 1, GenuineIntel",
    "cpu_usage": 0.3,
    "disk_space": 1906.8886680603027,
    "disk_usage": 367.17453384399414,
    "hostname": "SomeWhatPC",
    "kernel_version": "11",
    "network_usage": 47122134383,
    "os_version": "10.0.22631",
    "ram_usage": 18.366310119628906,
    "system_name": "Windows",
    "total_ram": 31.747447967529297,
    "uptime": 0.0
  }
];

async function sendTestData() {
  const bucketName = 'system_metrics_bucket';  // Adjust this to your desired bucket name
  try {
    for (const data of testData) {
      await writeData(bucketName, data);  // Call your function with the test data
    }
  } catch (error) {
    console.error('Error during test data send:', error);
  }
}

sendTestData();
