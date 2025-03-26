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
import getRandomColor from "../../helpers/getRandomColor";

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
  if (!assets || assets.length === 0) {
    return <Typography>No data available for chart</Typography>;
  }

  // Assuming all assets have the same number of history entries
  const labels = assets[0].history.map((_, index) => `Day ${index + 1}`);

  const chartData = {
    labels,
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
    <Box>
      <Typography variant="h6" gutterBottom>
        Historical Performance
      </Typography>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default PortfolioChart;
