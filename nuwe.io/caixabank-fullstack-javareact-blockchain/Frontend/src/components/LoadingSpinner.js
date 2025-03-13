import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = () => (
    <Box 
        sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}
        data-testid="loading-spinner"
    >
        <CircularProgress />
    </Box>
);
