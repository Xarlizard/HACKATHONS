import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import WalletOverview from "./WalletOverview";
import BuyUSDT from "./BuyUSDT";
import TradingPairs from "./TradingPairs";
import Navbar from "./Navbar";
import BlockchainExplorer from "./BlockchainExplorer";
import LoadingSpinner from "./LoadingSpinner";
import { getWalletBalance } from "../services/walletService";
import { useAuth } from '../hooks/useAuth';
import { CreateWalletButton } from './CreateWalletButton';

export const DashboardView = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWalletData = async () => {
    try {
      const response = await getWalletBalance();
      setWallet(response);
      setError('');
    } catch (error) {
      if (error.message.includes('Wallet not found')) {
        setWallet(null);
      } else {
        setError('Failed to fetch wallet data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box data-testid="dashboard-view" sx={{ minHeight: "100vh", backgroundColor: "#f2f2f2" }}>
      <Navbar />
      <Box display="flex" justifyContent="center">
        <Box data-testid="dashboard-content" sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3, width: 1200 }}>
          <Grid container spacing={3}>
            {/* Wallet Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Wallet Overview
                </Typography>
                {wallet ? (
                  <>
                    <WalletOverview wallet={wallet} />
                    <BuyUSDT onSuccess={fetchWalletData} />
                  </>
                ) : (
                  <CreateWalletButton onSuccess={fetchWalletData} />
                )}
                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Trading Pairs Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Trading Pairs
                </Typography>
                <TradingPairs />
              </Paper>
            </Grid>

            {/* Blockchain Explorer Section */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Blockchain Explorer
                </Typography>
                <BlockchainExplorer />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
