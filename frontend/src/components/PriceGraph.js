import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceGraph({ productId }) {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;

    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/price-history/${productId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch price history");
        }

        const data = await response.json();
        setHistory(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load price history");
      }
    };

    fetchHistory();
  }, [productId]);

  // Chart Data
  const chartData = {
    labels: history.map((item) => item.date),
    datasets: [
      {
        label: "Price (₹)",
        data: history.map((item) => item.price),
        borderColor: "#4285F4",
        backgroundColor: "rgba(66,133,244,0.15)",
        fill: true,
        tension: 0.35,
        pointRadius: 5,
        pointBackgroundColor: "#4285F4",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: "top",
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return "₹" + context.raw.toLocaleString();
          },
        },
      },
    },

    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "₹" + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        marginTop: "20px",
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && history.length === 0 && (
        <p>No price history available</p>
      )}

      {history.length > 0 && (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}

export default PriceGraph;