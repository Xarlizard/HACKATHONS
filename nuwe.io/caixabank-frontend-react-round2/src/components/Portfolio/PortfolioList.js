import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const PortfolioList = ({ assets }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Value ($)</TableCell>
            <TableCell>Daily Change (%)</TableCell>
            <TableCell>Total Change (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.name}>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell>{asset.value.toFixed(2)}</TableCell>
              <TableCell>{asset.dailyChange.toFixed(2)}</TableCell>
              <TableCell>{asset.totalChange.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PortfolioList;
