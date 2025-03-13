import React, { memo, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useData } from "../context/DataContext";

const ChartView = () => {
  const { items } = useData();

  // Memoize chart data calculations
  const chartData = useMemo(() => {
    const labels = items.map((item) => item.name);
    const values = items.map((item) => item.value);
    const changes = items.map((item) => item.change);

    return {
      labels,
      datasets: [
        {
          label: "Value",
          data: values,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "Change %",
          data: changes,
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
        },
      ],
    };
  }, [items]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    <div className="chart-container" style={{ height: "400px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default memo(ChartView);
