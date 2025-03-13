import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const ConversionResults = ({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
}) => {
  if (!amount || !convertedAmount) {
    return null;
  }

  return (
    <Paper elevation={2}>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Conversion Result
        </Typography>
        <Typography>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Exchange rate: 1 {fromCurrency} ={" "}
          {(convertedAmount / amount).toFixed(4)} {toCurrency}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ConversionResults;
