import React, { useState, useMemo, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { useCards } from '../context/CardsContext';
import { getNotch } from '../utils/getNotch';
import { generateCardColors } from '../utils/generateCardColors';

const CustomCard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { removeCard } = useCards();
  
  // Memoize the background color calculation
  const cardBackground = useMemo(() => {
    return card.background || generateCardColors(card.number);
  }, [card.background, card.number]);
  
  // Memoize the notch calculations
  const notches = useMemo(() => ({
    notchFront: getNotch(card.type, false),
    notchBack: getNotch(card.type, true)
  }), [card.type]);
  
  // Optimize event handlers with useCallback
  const handleFlip = useCallback(() => {
    setIsFlipped(prevState => !prevState);
  }, []);
  
  const handleRemove = useCallback(() => {
    removeCard(card.id);
  }, [removeCard, card.id]);
  
  // Combine card data with calculated notches
  const cardWithNotches = useMemo(() => ({
    ...card,
    notchFront: notches.notchFront,
    notchBack: notches.notchBack
  }), [card, notches]);
  
  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      <Box
        onClick={handleFlip}
        sx={{
          width: '340px',
          height: '215px',
          perspective: '1000px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
        data-testid="custom-card"
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s ease-in-out',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            background: cardBackground
          }}
        >
          <CardFront card={cardWithNotches} fontFamily={card.font} />
          <CardBack card={cardWithNotches} fontFamily={card.font} />
        </Box>
      </Box>
      
      <Button 
        variant="outlined" 
        color="error" 
        onClick={handleRemove}
        sx={{ mt: 1 }}
        data-testid="remove-card-button"
      >
        Remove Card
      </Button>
    </Box>
  );
};

export default React.memo(CustomCard);
