import { useEffect, useState } from "react";
import TileLayout from "../../components/Tiles/TileLayout";
import LineSingle from "../../components/Chart/LineSingle";
import DoubleSideBar from "../../components/Chart/DoubleSideBar";

const DashboardPage = () => {
  const [chartData, setChartData] = useState({});
  const [loadedCharts, setLoadedCharts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.50.28:8000/api/systems/system-dynamic/MCC_000001"
        );
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleTileLoad = (tile) => {
    if (!loadedCharts[tile] && chartData) {
      const newLoadedCharts = { ...loadedCharts };

      switch (tile) {
        case "cpu":
          newLoadedCharts["cpu"] = (
            <LineSingle
              rawData={chartData}
              measurement="cpu_usage"
              device="default_device"
              field="usage_percent"
              title="CPU Usage Over Time"
              axisTitle="Usage (%)"
              lineColor="rgba(255, 99, 132, 1)"
              backgroundColor="rgba(255, 99, 132, 0.2)"
              yMin={0}
              yMax={100}
              stepSize={10}
              yLabelCallback={(value) => `${value}%`}
            />
          );
          break;
        case "gpu":
          newLoadedCharts["gpu"] = (
            <LineSingle
              rawData={chartData}
              measurement="gpu_usage"
              device="default_device"
              field="usage_percent"
              title="GPU Usage Over Time"
              axisTitle="Usage (%)"
              lineColor="rgba(75, 192, 192, 1)"
              backgroundColor="rgba(75, 192, 192, 0.2)"
              yMin={0}
              yMax={100}
              stepSize={10}
              yLabelCallback={(value) => `${value}%`}
            />
          );
          break;
        case "memory":
          newLoadedCharts["memory"] = (
            <LineSingle
              rawData={chartData}
              measurement="memory_usage"
              device="default_device"
              field="used_memory"
              title="Memory Usage Over Time"
              axisTitle="Usage (GB)"
              lineColor="rgba(54, 162, 235, 1)"
              backgroundColor="rgba(54, 162, 235, 0.2)"
              yMin={0}
              yMax={32}
              stepSize={4}
              yLabelCallback={(value) => `${value}GB`}
            />
          );
          break;
        case "network":
          newLoadedCharts["network"] = (
            <DoubleSideBar
              data={chartData.network_usage?.default_device || []} // Pass the network usage data
            />
          );
          break;
        default:
          break;
      }

      setLoadedCharts(newLoadedCharts);
    }
  };

  return (
    <div className="App">
      <h1>System Metrics Dashboard</h1>
      zzz
      <TileLayout
        onTileLoad={handleTileLoad}
        networkUsageData={chartData.network_usage}
      />
      <div className="charts-container">
        {loadedCharts["cpu"]}
        {loadedCharts["gpu"]}
        {loadedCharts["memory"]}
        {loadedCharts["network"]}
      </div>
    </div>
  );
};

export default DashboardPage;
