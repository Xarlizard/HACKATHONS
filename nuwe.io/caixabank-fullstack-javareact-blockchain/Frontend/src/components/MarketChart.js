import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale } from "chart.js";
import { useMarket } from "../hooks/useMarket";
import { getChartColor } from "../utils/getChartColor";
import { getPrices } from '../services/marketService';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export const MarketChart = ({ symbol, showGrid = true, showLabels = true, height = 50 }) => {
  const [prices, setPrices] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const data = await getPrices();
        const price = data[symbol];
        
        setPrices(prev => {
          const newPrices = [...prev, price];
          return newPrices.slice(-10); // Keep only last 10 points
        });
        
        setLabels(prev => {
          const newLabels = [...prev, new Date().toLocaleTimeString()];
          return newLabels.slice(-10);
        });
      } catch (error) {
        console.error('Failed to fetch price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 3000);

    return () => clearInterval(interval);
  }, [symbol]);

  const chartColor = getChartColor(prices);

  const data = {
    labels,
    datasets: [
      {
        data: prices,
        borderColor: chartColor,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: showLabels,
        grid: {
          display: showGrid,
        },
      },
      y: {
        display: showLabels,
        grid: {
          display: showGrid,
        },
      },
    },
  };

  return (
    <Box sx={{ height }}>
      <Line data={data} options={options} />
    </Box>
  );
};
