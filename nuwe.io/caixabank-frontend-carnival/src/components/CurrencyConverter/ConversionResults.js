import React from "react";
import { Typography, Paper, Grid, Box } from "@mui/material";

const ConversionResults = ({ conversion, fee }) => {
  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Conversion Results
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Converted Amount (EUR):</Typography>
            <Typography variant="h5" color="primary">
              €{conversion.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Fee Applied (2%):</Typography>
            <Typography variant="h5" color="secondary">
              €{fee.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ConversionResults;
