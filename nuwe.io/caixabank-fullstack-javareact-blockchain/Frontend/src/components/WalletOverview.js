import React from "react";
import { Box, Typography, Paper, Divider, List, ListItem, ListItemText } from "@mui/material";
import CreateWalletButton from "./CreateWalletButton";
import { useMarket } from "../hooks/useMarket";

export default function WalletOverview({ walletData, onWalletCreated, error }) {
  const { prices } = useMarket();

  if (error) {
    return <CreateWalletButton onWalletCreated={onWalletCreated} />;
  }

  return (
    <Paper data-testid="wallet-overview" sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        💼 Wallet Address: <span data-testid="wallet-address">{walletData.wallet_address}</span>
      </Typography>
      <Typography variant="body1">
        Fiat Balance: €<span data-testid="fiat-balance">{walletData.cash_balance.toLocaleString()}</span>
      </Typography>
      <Typography variant="body1">
        Net Worth: €<span data-testid="net-worth">{walletData.net_worth.toLocaleString()}</span>
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography data-testid="wallet-assets-title" variant="subtitle1" sx={{ mb: 1 }}>
          {Object.entries(walletData.assets).length === 0 ? (
            <span data-testid="assets-warning">No assets found</span>
          ) : (
            <span data-testid="available-assets">Available Assets</span>
          )}
        </Typography>
        <List dense>
          {Object.entries(walletData.assets).map(([symbol, amount]) => (
            <ListItem key={symbol}>
              <ListItemText
                primary={symbol}
                secondary={`${amount.toLocaleString()} units`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
