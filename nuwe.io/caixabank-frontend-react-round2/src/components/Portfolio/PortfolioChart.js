import React from "react";
import { Box, Typography } from "@mui/material";
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
import { getRandomColor } from "../../helpers/getRandomColor";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PortfolioChart = ({ assets }) => {
  const chartData = {
    labels: assets[0]?.history.map((_, index) => `Day ${index + 1}`),
    datasets: assets.map((asset) => ({
      label: `${asset.name} (${asset.type})`,
      data: asset.history.map((entry) => entry.value),
      borderColor: getRandomColor(),
      backgroundColor: "rgba(0,0,0,0)",
      fill: false,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Portfolio Performance",
      },
    },
  };

  return (
    <Box mt={3} mb={3}>
      <Typography variant="h6" gutterBottom>
        Portfolio Performance
      </Typography>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default PortfolioChart;
