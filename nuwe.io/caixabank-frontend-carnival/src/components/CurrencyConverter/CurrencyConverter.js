import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import CurrencyForm from "./CurrencyForm";
import ConversionResults from "./ConversionResults";
import LoadingSpinner from "../shared/LoadingSpinner";
import useFetch from "../../hooks/useFetch";

const CurrencyConverter = () => {
  const {
    data: rates,
    isLoading,
    error: fetchError,
  } = useFetch("/data/exchangeRates.json");
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [conversion, setConversion] = useState(null);
  const [fee, setFee] = useState(null);
  const [conversionError, setConversionError] = useState("");

  useEffect(() => {
    if (rates && rates.toUSD) {
      // Extract available currencies from the rates data
      setCurrencies(Object.keys(rates.toUSD));
    }
  }, [rates]);

  const handleConvert = (inputAmount, currency) => {
    // Validate inputs
    if (!inputAmount || inputAmount <= 0) {
      setConversionError("Please enter a positive amount");
      return;
    }

    if (!currency) {
      setConversionError("Please select a currency");
      return;
    }

    setConversionError("");

    // Convert to USD first (if not already USD)
    let usdAmount;
    if (currency === "USD") {
      usdAmount = inputAmount;
    } else {
      usdAmount = inputAmount * rates.toUSD[currency];
    }

    // Convert USD to EUR
    const eurAmount = usdAmount * rates.usdToEUR;

    // Calculate fee (2% of EUR amount)
    const calculatedFee = eurAmount * 0.02;

    // Calculate net amount after fee
    const netAmount = eurAmount - calculatedFee;

    // Update state with calculated values
    setConversion(netAmount);
    setFee(calculatedFee);
  };

  // Combine errors for display
  const error = conversionError || fetchError;

  // Determine if results should be shown
  const showResults = conversion !== null && fee !== null;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Currency Converter
      </Typography>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box mt={3}>
          <CurrencyForm currencies={currencies} onConvert={handleConvert} />
        </Box>
      )}

      {showResults && (
        <Box mt={4}>
          <ConversionResults conversion={conversion} fee={fee} />
        </Box>
      )}

      {error && (
        <Typography color="error" data-testid="error-message">
          Error: {error}
        </Typography>
      )}
    </Container>
  );
};

export default CurrencyConverter;
