import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography, CircularProgress } from '@mui/material';
import { useCards } from '../context/CardsContext';
import generateLuhnCardNumber from '../utils/generateLuhnCardNumber';
import calculateExpirationDate from '../utils/calculateExpirationDate';
import fetchCVV from '../services/fetchCVV';
import calculateCVV from '../utils/calculateCVV';

const CardGenerator = () => {
  const { addCard, cards } = useCards();
  const [cardType, setCardType] = useState('credit');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('');
  
  // Reset cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(prevCooldown => prevCooldown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  
  const handleTypeChange = (event) => {
    setCardType(event.target.value);
  };
  
  const generateCard = useCallback(async () => {
    // Check if we've reached the card limit
    if (cards.length >= 10) {
      setError('Maximum card limit reached (10). Please remove a card to generate a new one.');
      return;
    }
    
    setError('');
    setIsGenerating(true);
    
    try {
      // Generate card number
      const cardNumber = generateLuhnCardNumber();
      
      // Calculate expiration date
      const expiration = calculateExpirationDate(cardNumber);
      
      // Fetch and calculate CVV
      const hexCodes = await fetchCVV();
      const cvv = calculateCVV(hexCodes);
      
      // Create new card
      const newCard = {
        number: cardNumber,
        type: cardType,
        expiration,
        cvv,
        background: null, // Will use dynamic background by default
        font: 'Arial' // Default font
      };
      
      // Add card to context
      const success = addCard(newCard);
      
      if (success) {
        // Start cooldown
        setCooldown(10);
      } else {
        setError('Failed to add card. Maximum limit may have been reached.');
      }
    } catch (error) {
      console.error('Error generating card:', error);
      setError('Failed to generate card. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [addCard, cardType, cards.length]);
  
  const isDisabled = cooldown > 0 || isGenerating || cards.length >= 10;
  
  return (
    <Box sx={{ mb: 4 }} data-testid="card-generator">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Generate New Card
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel id="card-type-label">Card Type</InputLabel>
          <Select
            labelId="card-type-label"
            value={cardType}
            onChange={handleTypeChange}
            label="Card Type"
            data-testid="card-type-select"
          >
            <MenuItem value="credit">Credit</MenuItem>
            <MenuItem value="debit">Debit</MenuItem>
            <MenuItem value="prepaid">Prepaid</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          variant="contained"
          color="primary"
          onClick={generateCard}
          disabled={isDisabled}
          startIcon={isGenerating ? <CircularProgress size={20} /> : null}
          data-testid="generate-card-button"
        >
          {isGenerating ? 'Generating...' : cooldown > 0 ? `Generate (${cooldown}s)` : 'Generate Card'}
        </Button>
      </Box>
      
      {error && (
        <Typography color="error" variant="body2" data-testid="error-message">
          {error}
        </Typography>
      )}
      
      {cards.length > 0 && (
        <Typography variant="body2" data-testid="cards-count">
          Cards: {cards.length}/10
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(CardGenerator);
