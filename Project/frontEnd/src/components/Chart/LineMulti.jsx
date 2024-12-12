import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const LineMulti = ({ rawData, measurement, device, fieldsToPlot, options }) => {
  const targetData = rawData[measurement]?.[device] || [];

  const parsedData = {
    labels: [
      ...new Set(
        targetData.map((entry) =>
          new Date(entry.timestamp).toLocaleTimeString()
        )
      ),
    ],
    datasets: fieldsToPlot.map((field, index) => ({
      label: field,
      data: targetData
        .filter((entry) => entry.field === field)
        .map((entry) => entry.value),
      borderColor: `hsl(${(index * 360) / fieldsToPlot.length}, 70%, 50%)`,
      backgroundColor: `hsla(${
        (index * 360) / fieldsToPlot.length
      }, 70%, 50%, 0.3)`,
      fill: false,
    })),
  };

  return (
    <div>
      <Line data={parsedData} options={options} />
    </div>
  );
};

export default LineMulti;
