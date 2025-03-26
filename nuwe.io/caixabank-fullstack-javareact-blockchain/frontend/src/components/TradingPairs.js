import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    List, 
    ListItem, 
    ListItemText,
    ListItemSecondaryAction,
    Chip,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPrices } from '../services/marketService';
import { MarketChart } from './MarketChart';

export const TradingPairs = () => {
    const navigate = useNavigate();
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const data = await getPrices();
                setPrices(data);
                setError('');
            } catch (error) {
                setError('Failed to fetch market prices');
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const handlePairClick = (symbol) => {
        navigate(`/trade/${symbol}`);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" sx={{ p: 2 }}>
                {error}
            </Typography>
        );
    }

    return (
        <Box data-testid="trading-pairs">
            <List>
                {Object.entries(prices).map(([symbol, price]) => (
                    <ListItem
                        key={symbol}
                        button
                        onClick={() => handlePairClick(symbol)}
                        sx={{ 
                            borderBottom: '1px solid #eee',
                            '&:last-child': { borderBottom: 'none' }
                        }}
                    >
                        <ListItemText
                            primary={symbol}
                            secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="body2">
                                        ${price.toLocaleString()}
                                    </Typography>
                                    <Box sx={{ width: 150, height: 50 }}>
                                        <MarketChart 
                                            symbol={symbol} 
                                            showGrid={false}
                                            showLabels={false}
                                        />
                                    </Box>
                                </Box>
                            }
                        />
                        <ListItemSecondaryAction>
                            <Chip
                                label="Trade"
                                color="primary"
                                size="small"
                                onClick={() => handlePairClick(symbol)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
