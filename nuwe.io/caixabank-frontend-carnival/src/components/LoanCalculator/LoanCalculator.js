import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import LoanForm from "./LoanForm";
import LoanResults from "./LoanResults";

const LoanCalculator = () => {
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  // TODO: Check if `monthlyPayment` and `totalPayment` are valid.
  const showResults = false;

  const handleCalculate = (amount, rate, duration) => {
    // Convert annual rate to monthly rate (percentage)
    const monthlyRate = rate / 1200;

    // Calculate compounding factor
    const factor = Math.pow(1 + monthlyRate, duration);

    // Calculate monthly payment using the formula
    const calculatedMonthlyPayment =
      (amount * monthlyRate * factor) / (factor - 1);

    // Calculate total payment
    const calculatedTotalPayment = calculatedMonthlyPayment * duration;

    // Update state with calculated values
    setMonthlyPayment(calculatedMonthlyPayment);
    setTotalPayment(calculatedTotalPayment);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Loan Calculator
      </Typography>
      <Box mt={3}>
        <LoanForm onCalculate={handleCalculate} />
      </Box>
      <Box mt={4}>
        <LoanResults
          monthlyPayment={monthlyPayment}
          totalPayment={totalPayment}
        />
      </Box>
    </Container>
  );
};

export default LoanCalculator;
