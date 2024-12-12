import { useState, useEffect } from "react";
import TileLayout from "../../components/Tiles/TileLayout";
import "./HomePage.css";
import { ipadd } from "../../url";
import Reload from "../../Icons/Reload";

const HomePage = () => {
  const [systemData, setSystemData] = useState(null);
  const [systemAverage, setSystemAverage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSystemData = async () => {
    setLoading(true);
    try {
      const [mongoDataResponse, averageDataResponse] = await Promise.all([
        fetch(`${ipadd}/api/get/mongo-data`),
        fetch("http://192.168.50.28:8000/api/get/average"),
      ]);

      const mongoData = await mongoDataResponse.json();
      const averageData = await averageDataResponse.json();

      setSystemData(mongoData);
      setSystemAverage(averageData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="system-bar">
        {loading ? (
          <p>Loading...</p>
        ) : (
          systemData && (
            <>
              <p>Total RAM: {systemData.total_ram.toFixed(2)} GB</p>
              <p>Total Storage: {systemData.total_storage}</p>
              <p>All CPU Cores: {systemData.total_cpu_cores}</p>
              <p>All CPU Threads: {systemData.total_cpu_threads}</p>
              <p>Total GPU Memory: {systemData.total_gpu_memory} GB</p>
              <p>Added Clients: {systemData.client_count}</p>
              <button className="reload-button" onClick={fetchSystemData}>
                <Reload />
              </button>
            </>
            
          )
        )}
        
      </div>
      <div>
        <p>GPU Usage Average: {systemAverage?.gpuUsageAverage || "N/A"}</p>
        <p>Disk Usage Average: {systemAverage?.diskUsageAverage || "N/A"}</p>
        <p>CPU Usage: {systemAverage?.cpuUsage || "N/A"}</p>       
      </div>
      <TileLayout />
    </div>
  );
};

export default HomePage;
