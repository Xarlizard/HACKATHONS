import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Container,
} from "@mui/material";
import PortfolioList from "./PortfolioList";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../shared/LoadingSpinner";
import PortfolioChart from "./PortfolioChart";
// TODO: Import all the necessary components and hooks.

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const { data, isLoading, error } = useFetch("/data/investments.json");

  // Handle loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Handle error state
  if (error) {
    return (
      <Typography color="error" data-testid="error-message">
        Error: {error}
      </Typography>
    );
  }

  // Handle case when data is not available
  if (!data || !data.investments) {
    return <Typography>No data available.</Typography>;
  }

  // Filter assets
  const filteredAssets = data.investments.filter((asset) =>
    filter === "All" ? true : asset.type === filter
  );

  // Handle empty filtered results
  if (filteredAssets.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box p={3}>
          <Typography variant="h4" gutterBottom>
            Investment Portfolio
          </Typography>
          <FormControl sx={{ mb: 3, minWidth: 120 }}>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              displayEmpty
              data-testid="filter-select"
            >
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="Stocks">Stocks</MenuItem>
              <MenuItem value="Crypto">Crypto</MenuItem>
              <MenuItem value="Funds">Funds</MenuItem>
            </Select>
          </FormControl>
          <Typography>No investments found for the selected filter.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Investment Portfolio
        </Typography>
        <FormControl sx={{ mb: 3, minWidth: 120 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
            data-testid="filter-select"
          >
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Stocks">Stocks</MenuItem>
            <MenuItem value="Crypto">Crypto</MenuItem>
            <MenuItem value="Funds">Funds</MenuItem>
          </Select>
        </FormControl>
        <PortfolioChart assets={filteredAssets} />
        <PortfolioList assets={filteredAssets} />
      </Box>
    </Container>
  );
};

export default Portfolio;
