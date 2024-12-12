import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const LineSingle = ({
  rawData,
  measurement,
  device,
  field,
  options,
  lineColor = "rgba(75, 192, 192, 1)",
  backgroundColor = "rgba(75, 192, 192, 0.2)",
  title = "",
  axisTitle = "Value",
  labelPrefix = "",
}) => {
  const targetData = rawData[measurement]?.[device] || [];

  const filteredData = targetData.filter((entry) => entry.field === field);

  const parsedData = {
    labels: [
      ...new Set(
        filteredData.map((entry) =>
          new Date(entry.timestamp).toLocaleTimeString()
        )
      ),
    ],
    datasets: [
      {
        label: labelPrefix + field,
        data: filteredData.map((entry) => entry.value),
        borderColor: lineColor,
        backgroundColor: backgroundColor,
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  const customizedOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title || `${measurement} - ${device}`,
      },
      ...options?.plugins,
    },
    scales: {
      y: {
        title: {
          display: true,
          text: axisTitle,
        },
        beginAtZero: true,
      },
      ...options?.scales,
    },
  };

  return (
    <div>
      <Line data={parsedData} options={customizedOptions} />
    </div>
  );
};

export default LineSingle;
