import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const PortfolioList = ({ assets }) => {
  if (!assets || assets.length === 0) {
    return <Typography>No assets to display</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" p={2}>
        Investment Details
      </Typography>
      <Table aria-label="portfolio table">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Value ($)</TableCell>
            <TableCell align="right">Daily Change (%)</TableCell>
            <TableCell align="right">Total Change (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.name}>
              <TableCell component="th" scope="row">
                {asset.name}
              </TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell align="right">{asset.value.toFixed(2)}</TableCell>
              <TableCell
                align="right"
                style={{ color: asset.dailyChange >= 0 ? "green" : "red" }}
              >
                {asset.dailyChange >= 0 ? "+" : ""}
                {asset.dailyChange.toFixed(2)}%
              </TableCell>
              <TableCell
                align="right"
                style={{ color: asset.totalChange >= 0 ? "green" : "red" }}
              >
                {asset.totalChange >= 0 ? "+" : ""}
                {asset.totalChange.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PortfolioList;
