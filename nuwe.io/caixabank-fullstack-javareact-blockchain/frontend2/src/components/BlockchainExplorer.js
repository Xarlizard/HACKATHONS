import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { getBlocks, validateChain, mineBlock } from "../services/blockchainService";

export const BlockchainExplorer = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mining, setMining] = useState(false);

  const fetchBlocks = async () => {
    try {
      const data = await getBlocks();
      setBlocks(data);
      setError("");
    } catch (error) {
      setError("Failed to fetch blockchain data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const handleMineBlock = async () => {
    setMining(true);
    try {
      await mineBlock();
      await fetchBlocks();
    } catch (error) {
      setError(error.message);
    } finally {
      setMining(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box data-testid="blockchain-explorer">
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">
          Blockchain Explorer
        </Typography>
        <Button
          variant="contained"
          onClick={handleMineBlock}
          disabled={mining}
        >
          {mining ? "Mining..." : "Mine Block"}
        </Button>
      </Box>

      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Block Index</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Previous Hash</TableCell>
                <TableCell>Hash</TableCell>
                <TableCell>Genesis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blocks.map((block) => (
                <TableRow key={block.hash}>
                  <TableCell>{block.blockIndex}</TableCell>
                  <TableCell>
                    {new Date(block.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{block.previousHash}</TableCell>
                  <TableCell>{block.hash}</TableCell>
                  <TableCell>{block.genesis ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
