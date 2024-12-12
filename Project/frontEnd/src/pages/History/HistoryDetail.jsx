import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ipadd } from "../../url";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const HistoryDetail = () => {
  const { hostname, client_id } = useParams();
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    fetch(`${ipadd}/api/systems/system-history/${client_id}`)
      .then((response) => response.json())
      .then((data) => setHistoryData(data.systemData))
      .catch((error) => console.error("Error fetching history data:", error));
  }, []);

  const parseDataForGraph = (field, key) => {
    if (!historyData) return { labels: [], datasets: [] };

    const deviceData = historyData[field]?.default_device || [];
    return {
      labels: deviceData.map((item) =>
        new Date(item.timestamp).toLocaleTimeString()
      ),
      datasets: [
        {
          label: key,
          data: deviceData
            .filter((item) => item.field === key)
            .map((item) => item.value),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
      ],
    };
  };

  const networkUsageData = parseDataForGraph("network_usage", "bytes_received");
  const diskUsageData = parseDataForGraph("disk_usage", "used_space");
  const memoryUsageData = parseDataForGraph("memory_usage", "used_memory");
  const gpuUsageData = parseDataForGraph("gpu_usage", "gpu_usage");
  const cpuUsageData = parseDataForGraph("cpu_usage", "value");
  const gpuTempData = parseDataForGraph("gpu_temperature", "value");

  return (
    <div>
      <h1>System: {hostname}</h1>
      <p>Client ID: {client_id}</p>
      <h1>System History Details</h1>
      <div>
        <h2>Network Usage (Bytes Received)</h2>
        <Line data={networkUsageData} />
      </div>
      <div>
        <h2>Disk Usage (Used Space)</h2>
        <Line data={diskUsageData} />
      </div>
      <div>
        <h2>Memory Usage (Used Memory)</h2>
        <Line data={memoryUsageData} />
      </div>
      <div>
        <h2>GPU Usage</h2>
        <Line data={gpuUsageData} />
      </div>
      <div>
        <h2>CPU Usage</h2>
        <Line data={cpuUsageData} />
      </div>
      <div>
        <h2>GPU Temperature</h2>
        <Line data={gpuTempData} />
      </div>
    </div>
  );
};

export default HistoryDetail;
