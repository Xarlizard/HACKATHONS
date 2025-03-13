import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
} from '@mui/material';
import { getTransactions } from '../services/walletService';

export const TransactionsTable = ({ symbol }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                const filteredTransactions = symbol
                    ? [...data.sent, ...data.received].filter(tx => tx.assetSymbol === symbol)
                    : [...data.sent, ...data.received];
                
                setTransactions(filteredTransactions.sort((a, b) => 
                    new Date(b.timestamp) - new Date(a.timestamp)
                ));
                setError('');
            } catch (error) {
                setError('Failed to fetch transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [symbol]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return (
            <Typography color="error">
                {error}
            </Typography>
        );
    }

    if (transactions.length === 0) {
        return (
            <Typography>
                No transactions found
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                            <TableCell>
                                <Typography
                                    color={tx.type === 'BUY' ? 'success.main' : 'error.main'}
                                >
                                    {tx.type}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {tx.amount} {tx.assetSymbol}
                            </TableCell>
                            <TableCell>
                                ${tx.pricePerUnit}
                            </TableCell>
                            <TableCell>
                                {tx.status}
                            </TableCell>
                            <TableCell>
                                {new Date(tx.timestamp).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
