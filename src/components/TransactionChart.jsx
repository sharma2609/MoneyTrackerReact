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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TransactionChart = ({ transactions }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Transaction Amount",
        data: [],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // Create a map to accumulate transaction amounts
    const transactionMap = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date).toISOString().split("T")[0];
      if (!transactionMap[date]) {
        transactionMap[date] = 0;
      }
      transactionMap[date] += transaction.amount;
    });

    const labels = Object.keys(transactionMap).sort();
    const data = labels.map((date) => transactionMap[date]);

    // Update chart data
    setChartData({
      labels,
      datasets: [
        {
          label: "Transaction Amount",
          data,
          borderColor: "#007bff",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderWidth: 2,
          fill: true,
        },
      ],
    });
  }, [transactions]); // Recalculate chart data when transactions change

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `$${context.raw.toFixed(2)}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
              beginAtZero: true,
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
            y: {
              title: {
                display: true,
                text: "Amount ($)",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default TransactionChart;
