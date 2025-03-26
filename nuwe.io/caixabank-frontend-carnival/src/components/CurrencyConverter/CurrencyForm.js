import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

const CurrencyForm = ({ currencies, onConvert }) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConvert(parseFloat(amount), currency);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <FormControl fullWidth>
            <InputLabel id="currency-select-label">From Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              id="currency-select"
              value={currency}
              label="From Currency"
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((curr) => (
                <MenuItem key={curr} value={curr}>
                  {curr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box display="flex" height="100%" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ height: "56px" }}
            >
              Convert
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2">Destination Currency: EUR</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrencyForm;
