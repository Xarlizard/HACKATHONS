import React from "react";
import { Box, Typography } from "@mui/material";

const LoanResults = ({ monthlyPayment, totalPayment }) => {
  if (!monthlyPayment || !totalPayment) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Loan Summary
      </Typography>
      <Typography variant="body1">
        Monthly Payment: ${monthlyPayment.toFixed(2)}
      </Typography>
      <Typography variant="body1">
        Total Payment: ${totalPayment.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default LoanResults;
