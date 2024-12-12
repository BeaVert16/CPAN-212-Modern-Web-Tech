import DoubleSideBar from "../../components/Chart/DoubleSideBar";
import LineSingle from "../../components/Chart/LineSingle";

const Graph = () => {
  const rawData = [
    {
      timestamp: "2024-12-11T13:47:00Z",
      field: "bytes_received",
      value: 120848,
    },
    { timestamp: "2024-12-11T13:47:00Z", field: "bytes_sent", value: 23805 },
    {
      timestamp: "2024-12-11T13:47:48.381205767Z",
      field: "bytes_received",
      value: 454122.2,
    },
    {
      timestamp: "2024-12-11T13:47:48.381205767Z",
      field: "bytes_sent",
      value: 5713.4,
    },
  ];

  const cpuData = {
    cpu_usage: {
      device1: [
        { timestamp: "2024-12-11T13:47:00Z", field: "value", value: 5 },
        { timestamp: "2024-12-11T13:48:00Z", field: "value", value: 10 },
      ],
      device2: [
        { timestamp: "2024-12-11T13:47:00Z", field: "value", value: 7 },
        { timestamp: "2024-12-11T13:48:00Z", field: "value", value: 12 },
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "CPU Usage for Device1",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Network Usage Dashboard</h1>
      <DoubleSideBar data={rawData} />

      <h1>CPU Usage for Device 1</h1>
      <LineSingle
        rawData={cpuData}
        measurement="cpu_usage"
        device="device1"
        field="value"
        options={options}
        lineColor="rgba(255, 99, 132, 1)"
        backgroundColor="rgba(255, 99, 132, 0.2)"
        title="CPU Usage Over Time"
        axisTitle="Usage (%)"
        yMin={0}
        yMax={100}
        stepSize={5}
        yLabelCallback={(value) => `${value}%`}
      />
    </div>
  );
};

export default Graph;
