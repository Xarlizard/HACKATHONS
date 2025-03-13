import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import LoanForm from "./LoanForm";
import LoanResults from "./LoanResults";
// TODO: Import all the necessary components.

const LoanCalculator = () => {
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  // TODO: Check if `monthlyPayment` and `totalPayment` are valid.
  const showResults = false;

  // TODO: Implement the calculation logic to compute `monthlyPayment` and `totalPayment`.
  const handleCalculate = (amount, rate, duration) => {
    // Convert annual rate to monthly rate (rate / 12 / 100)
    const monthlyRate = rate / 1200;

    // Calculate the compounding factor
    const factor = Math.pow(1 + monthlyRate, duration);

    // Calculate monthly payment using the loan amortization formula
    const calculatedMonthlyPayment =
      (amount * monthlyRate * factor) / (factor - 1);

    // Calculate total payment
    const calculatedTotalPayment = calculatedMonthlyPayment * duration;

    setMonthlyPayment(calculatedMonthlyPayment);
    setTotalPayment(calculatedTotalPayment);
  };

  // TODO: Pass the necessary props to components.
  return (
    <Container maxWidth="sm">
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Loan Calculator
        </Typography>
        <LoanForm onCalculate={handleCalculate} />
        <LoanResults
          monthlyPayment={monthlyPayment}
          totalPayment={totalPayment}
        />
      </Box>
    </Container>
  );
};

export default LoanCalculator;
