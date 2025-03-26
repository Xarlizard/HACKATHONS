import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";

const LoanForm = ({ onCalculate }) => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!amount || !rate || !duration) {
      setError("All fields are required");
      return;
    }

    const amountNum = parseFloat(amount);
    const rateNum = parseFloat(rate);
    const durationNum = parseInt(duration, 10);

    if (amountNum <= 0 || rateNum <= 0 || durationNum <= 0) {
      setError("All values must be positive numbers");
      return;
    }

    // Clear error if validation passes
    setError("");

    // Call the calculate function with validated inputs
    onCalculate(amountNum, rateNum, durationNum);
  };

  // Reset error when inputs change
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Loan Amount"
            type="number"
            value={amount}
            onChange={handleInputChange(setAmount)}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Annual Interest Rate (%)"
            type="number"
            value={rate}
            onChange={handleInputChange(setRate)}
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Duration (months)"
            type="number"
            value={duration}
            onChange={handleInputChange(setDuration)}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Calculate
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoanForm;
