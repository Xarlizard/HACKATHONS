import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  fetchExchangeRates,
  getAvailableCurrencies,
} from "../../services/currencyService";
import ConversionResults from "./ConversionResults";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currencies = getAvailableCurrencies();

  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        setLoading(true);
        const data = await fetchExchangeRates(fromCurrency);
        setExchangeRates(data);
        setError(null);
      } catch (err) {
        setError("Failed to load exchange rates");
      } finally {
        setLoading(false);
      }
    };

    loadExchangeRates();
  }, [fromCurrency]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const convertedAmount = exchangeRates
    ? (parseFloat(amount || 0) * exchangeRates.rates[toCurrency]).toFixed(2)
    : "0.00";

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom align="center">
          Currency Converter
        </Typography>
        <Box my={3}>
          <TextField
            fullWidth
            label="Amount"
            value={amount}
            onChange={handleAmountChange}
            type="text"
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="From Currency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            margin="normal"
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.name} ({currency.code})
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="To Currency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            margin="normal"
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.name} ({currency.code})
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <ConversionResults
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          convertedAmount={convertedAmount}
        />
      </Box>
    </Container>
  );
};

export default CurrencyConverter;
