import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";

const FilterSection = React.memo(
  ({ filter, sortType, onFilterChange, onSortChange }) => {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Filter by Type:</Typography>
          <Select
            value={filter}
            onChange={onFilterChange}
            sx={{ marginLeft: 2, minWidth: 150 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Stocks">Stocks</MenuItem>
            <MenuItem value="Crypto">Crypto</MenuItem>
            <MenuItem value="Funds">Funds</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Sort by:</Typography>
          <Select
            value={sortType}
            onChange={onSortChange}
            sx={{ marginLeft: 2, minWidth: 150 }}
          >
            <MenuItem value="Name">Name</MenuItem>
            <MenuItem value="Value">Value</MenuItem>
            <MenuItem value="Daily Change">Daily Change</MenuItem>
          </Select>
        </Box>
      </Box>
    );
  }
);

FilterSection.displayName = "FilterSection";

export default FilterSection;
