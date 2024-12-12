import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const DoubleSideBar = ({
  data,
  timeField = "timestamp",
  fieldFilter = ["bytes_sent", "bytes_received"],
}) => {
  const timestamps = data.map((entry) =>
    new Date(entry[timeField]).toLocaleTimeString()
  );

  const bytesReceived = data
    .filter((entry) => entry.field === fieldFilter[1])
    .map((entry) => entry.value);

  const bytesSent = data
    .filter((entry) => entry.field === fieldFilter[0])
    .map((entry) => -entry.value);
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Bytes Received",
        data: bytesReceived,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Bytes Sent",
        data: bytesSent,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Network Usage (Bytes Sent and Received)",
      },
    },
    scales: {
      x: {
        type: "category",
        labels: timestamps,
        title: {
          display: true,
          text: "Time",
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "Bytes",
        },
        ticks: {
          callback: function (value) {
            return value < 0 ? `${-value} Sent` : `${value} Received`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DoubleSideBar;
