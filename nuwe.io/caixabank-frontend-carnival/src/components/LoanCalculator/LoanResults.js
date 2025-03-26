import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const LoanResults = ({ monthlyPayment, totalPayment }) => {
  // Only render results if both values are available
  if (monthlyPayment === null || totalPayment === null) {
    return null;
  }

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Loan Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Monthly Payment:</Typography>
            <Typography variant="h5" color="primary">
              ${monthlyPayment.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Total Repayment:</Typography>
            <Typography variant="h5" color="primary">
              ${totalPayment.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default LoanResults;
