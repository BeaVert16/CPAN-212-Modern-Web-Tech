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

const SystemDetail = () => {
  const { hostname, client_id } = useParams();
  const [staticData, setStaticData] = useState(null);
  const [dynamicData, setDynamicData] = useState([]);
  const [chartData, setChartData] = useState(null);

  const processChartData = (data) => {
    const timestamps = data.cpu_usage?.default_device.map((entry) =>
      new Date(entry.timestamp).toLocaleTimeString()
    );

    const cpuUsage = data.cpu_usage?.default_device.map((entry) => entry.value);
    const gpuUsage = data.gpu_usage?.default_device
      .filter((entry) => entry.field === "gpu_usage")
      .map((entry) => entry.value);
    const memoryUsage = data.memory_usage?.default_device
      .filter((entry) => entry.field === "used_memory")
      .map((entry) => entry.value);
    const networkReceived = data.network_usage?.default_device
      .filter((entry) => entry.field === "bytes_received")
      .map((entry) => entry.value);
    const networkSent = data.network_usage?.default_device
      .filter((entry) => entry.field === "bytes_sent")
      .map((entry) => entry.value);

    return {
      labels: timestamps,
      datasets: [
        {
          label: "CPU Usage (%)",
          data: cpuUsage,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
        {
          label: "GPU Usage (%)",
          data: gpuUsage,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
        {
          label: "Used Memory (MB)",
          data: memoryUsage,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
  };

  useEffect(() => {
    fetch(`${ipadd}/api/systems/system-static/${client_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.type === "static") {
          setStaticData(data.data);
        }
      })
      .catch((error) => console.error("Error fetching static data:", error));

    const interval = setInterval(() => {
      fetch(`${ipadd}/api/systems/system-dynamic/${client_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.type === "dynamic") {
            setDynamicData((prevData) => {
              const updatedData = [...prevData, data.data];
              setChartData(processChartData(data.data));
              return updatedData.slice(-10);
            });
          }
        })
        .catch((error) => console.error("Error fetching dynamic data:", error));
    }, 5000);

    return () => clearInterval(interval);
  }, [client_id]);

  return (
    <div>
      <h1>System: {hostname}</h1>
      <p>Client ID: {client_id}</p>

      {staticData && (
        <div>
          <h2>System Info</h2>
          <p>System Name: {staticData.system_name}</p>
          <p>Total RAM: {staticData.total_ram}</p>
          <p>OS Info: {staticData.os_info}</p>
          <p>CPU Name: {staticData.cpu_name}</p>
          <p>GPU Name: {staticData.gpu_name}</p>
          <p>GPU Total Memory: {staticData.gpu_total_memory}</p>
          <p>Total Storage Space: {staticData.total_storage_space}</p>
          <p>IP Address: {staticData.ip_address}</p>
          <p>MAC Address: {staticData.mac_address}</p>
          <h3>Drives</h3>
          <ul>
            {staticData.drives.map((drive, index) => (
              <li key={index}>
                {drive.drive_letter}: {drive.drive} ({drive.drive_total_storage}{" "}
                GB)
              </li>
            ))}
          </ul>
        </div>
      )}

      {chartData && (
        <div>
          <h2>Dynamic Data</h2>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default SystemDetail;
