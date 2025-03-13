import React, { useState } from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { createWallet } from "../services/walletService";

export const CreateWalletButton = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateWallet = async () => {
    setLoading(true);
    setError("");
    try {
      await createWallet();
      onSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box data-testid="create-wallet-button" sx={{ textAlign: "center", py: 3 }}>
      <Typography variant="body1" gutterBottom>
        You don't have a wallet yet. Create one to start trading!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateWallet}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Create Wallet"
        )}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
