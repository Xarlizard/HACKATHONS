import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import PortfolioList from "./PortfolioList";
import PortfolioChart from "./PortfolioChart";
import LoadingSpinner from "../shared/LoadingSpinner";
import useFetch from "../../hooks/useFetch";

const Portfolio = () => {
  const { data, isLoading, error } = useFetch("/data/investments.json");
  const [assetType, setAssetType] = useState("All");
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Data received:", data); // Debug log

      // Check if data is an array, if not, check if it has an 'investments' property
      let assets = [];
      if (Array.isArray(data)) {
        assets = data;
      } else if (data && typeof data === "object") {
        // Try to find an array property in the data object
        const possibleArrayProps = Object.values(data).filter(Array.isArray);
        if (possibleArrayProps.length > 0) {
          assets = possibleArrayProps[0];
        }
      }

      console.log("Assets to filter:", assets); // Debug log
      console.log("Current filter:", assetType); // Debug log

      if (assetType === "All") {
        setFilteredAssets(assets);
      } else {
        const filtered = assets.filter((asset) => asset.type === assetType);
        console.log("Filtered assets:", filtered); // Debug log
        setFilteredAssets(filtered);
      }
    }
  }, [data, assetType]);

  const handleTypeChange = (event) => {
    setAssetType(event.target.value);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Typography color="error" data-testid="error-message">
        Error: {error}
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Investment Portfolio
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="asset-type-label">Filter by Asset Type</InputLabel>
        <Select
          labelId="asset-type-label"
          id="asset-type"
          value={assetType}
          label="Filter by Asset Type"
          onChange={handleTypeChange}
          data-testid="filter-select"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Stocks">Stocks</MenuItem>
          <MenuItem value="Crypto">Crypto</MenuItem>
          <MenuItem value="Funds">Funds</MenuItem>
        </Select>
      </FormControl>

      {filteredAssets && filteredAssets.length > 0 ? (
        <Box mt={4}>
          <PortfolioChart assets={filteredAssets} />
          <Box mt={4}>
            <PortfolioList assets={filteredAssets} />
          </Box>
        </Box>
      ) : (
        <Typography>
          No investments found for the selected filter.
          {data && <span> (Data was loaded but no matching assets found)</span>}
        </Typography>
      )}
    </Container>
  );
};

export default Portfolio;
