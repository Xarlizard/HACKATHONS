import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

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

    const numAmount = parseFloat(amount);
    const numRate = parseFloat(rate);
    const numDuration = parseInt(duration);

    if (numAmount <= 0 || numRate <= 0 || numDuration <= 0) {
      setError("All values must be positive numbers");
      return;
    }

    setError("");
    onCalculate(numAmount, numRate, numDuration);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        type="number"
        label="Loan Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Annual Interest Rate (%)"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Duration (months)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Calculate
      </Button>
    </Box>
  );
};

export default LoanForm;
