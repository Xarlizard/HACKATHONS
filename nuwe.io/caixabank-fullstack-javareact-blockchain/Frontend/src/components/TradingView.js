import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    CircularProgress,
    InputAdornment,
    Tabs,
    Tab,
} from '@mui/material';
import { useMarket } from '../hooks/useMarket';
import { MarketChart } from './MarketChart';
import { TransactionsTable } from './TransactionsTable';
import { buyAsset, sellAsset } from '../services/walletService';

export const TradingView = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const { prices, loading: pricesLoading } = useMarket();
    const [activeTab, setActiveTab] = useState(0);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!pricesLoading && !prices[symbol]) {
            navigate('/dashboard');
        }
    }, [symbol, prices, pricesLoading, navigate]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setAmount('');
        setError('');
    };

    const handleTrade = async () => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (activeTab === 0) { // Buy
                await buyAsset({
                    symbol,
                    quantity: parseFloat(amount)
                });
            } else { // Sell
                await sellAsset({
                    symbol,
                    quantity: parseFloat(amount)
                });
            }
            setAmount('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (pricesLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }} data-testid="trading-view">
            <Grid container spacing={3}>
                {/* Chart Section */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            {symbol}/USDT - ${prices[symbol]?.toLocaleString()}
                        </Typography>
                        <Box sx={{ height: 400 }}>
                            <MarketChart 
                                symbol={symbol}
                                showGrid={true}
                                showLabels={true}
                                height={400}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Trading Section */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Tabs value={activeTab} onChange={handleTabChange}>
                            <Tab label="Buy" />
                            <Tab label="Sell" />
                        </Tabs>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={loading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {symbol}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {amount && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Total: ${(parseFloat(amount) * prices[symbol]).toLocaleString()} USDT
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                variant="contained"
                                color={activeTab === 0 ? "primary" : "error"}
                                onClick={handleTrade}
                                disabled={loading || !amount}
                                sx={{ mt: 2 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    activeTab === 0 ? 'Buy' : 'Sell'
                                )}
                            </Button>
                            {error && (
                                <Typography color="error" sx={{ mt: 2 }}>
                                    {error}
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                {/* Transactions Section */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Transactions
                        </Typography>
                        <TransactionsTable symbol={symbol} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
