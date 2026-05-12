import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function ComparisonGraph({ amazon = [], flipkart = [] }) {

  const labels = Array.from(
    new Set([
      ...amazon.map(i => i.date),
      ...flipkart.map(i => i.date)
    ])
  );

  const amazonPrices = labels.map(date =>
    amazon.find(i => i.date === date)?.price || null
  );

  const flipkartPrices = labels.map(date =>
    flipkart.find(i => i.date === date)?.price || null
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Amazon",
        data: amazonPrices,
        borderColor: "#ff9900",
        backgroundColor: "rgba(255,153,0,0.2)",
        tension: 0.4
      },
      {
        label: "Flipkart",
        data: flipkartPrices,
        borderColor: "#2874f0",
        backgroundColor: "rgba(40,116,240,0.2)",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" }
    },
    scales: {
      y: {
        ticks: {
          callback: v => "₹" + v
        }
      }
    }
  };

  if (!labels.length) {
    return <p>No comparison data available</p>;
  }

  return (
    <div style={{ height: "350px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default ComparisonGraph;