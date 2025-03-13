import React, { useState } from "react";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { buyAsset, sellAsset } from "../services/walletService";
import { useMarket } from "../hooks/useMarket";

export default function AssetTradingPanel({ asset, usdtBalance, assetBalance, onTransactionComplete }) {
  const {} = useMarket();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTransaction = async (type) => {

  };

  return (
    <Paper sx={{ width: 300, ml: 2, padding: 2, height: 270 }}>
      <Box sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">
          📈 Market Price:
        </Typography>
        <Typography variant="h6">
          <b>${}</b>
        </Typography>
      </Box>
      <Typography sx={{ mb: 1 }}>Available Assets:</Typography>
      <Typography sx={{ mb: 1 }} variant="body2">
        USDT: <b data-testid="usdt-balance">{}</b>
      </Typography>
      <Typography sx={{ mb: 2 }} variant="body2">
        {}: <b data-testid="asset-balance">{}</b>
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField data-testid="asset-amount-input" label="Amount" variant="outlined" type="number" fullWidth size="small" value={} onChange={} />
      </Box>
      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button data-testid="buy-asset-button" variant="contained" color="success" fullWidth onClick={() => handleTransaction("buy")} disabled={}>
          {`Buy ${}`}
        </Button>
        <Button data-testid="sell-asset-button" variant="contained" color="error" fullWidth onClick={() => handleTransaction("sell")} disabled={}>
          {`Sell ${}`}
        </Button>
      </Box>
      {error && (
        <Typography data-testid="asset-transaction-error" variant="body2" color="error" sx={{ mt: 6 }}>
          {}
        </Typography>
      )}
    </Paper>
  );
}
