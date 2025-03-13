import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    p={4}
    data-testid="loading-spinner"
  >
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
