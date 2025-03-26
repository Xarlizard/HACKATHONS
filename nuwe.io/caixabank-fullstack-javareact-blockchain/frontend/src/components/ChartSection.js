import React from "react";
import { Paper, Typography } from "@mui/material";
import MarketChart from "./MarketChart";
import LoadingSpinner from "./LoadingSpinner";
import { useMarket } from "../hooks/useMarket";

export default function ChartSection({ asset }) {
  const {} = useMarket();

  return (
    <Paper sx={{ height: 470, width: 820, padding: 2 }}>
      <Typography data-testid="chart-title" variant="h6" sx={{ mb: 2 }}>
        {}/USDT Chart
      </Typography>
      {loading ? (
        <LoadingSpinner data-testid="asset-loader" />
      ) : (
        <MarketChart asset={} data-testid="asset-chart" />
      )}
    </Paper>
  );
}
