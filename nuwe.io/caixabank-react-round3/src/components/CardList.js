import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import CustomCard from './CustomCard';
import { useCards } from '../context/CardsContext';

const CardList = () => {
  const { cards } = useCards();
  
  // Memoize the cards list to prevent unnecessary re-renders
  const cardsList = useMemo(() => {
    return cards.map(card => (
      <CustomCard key={card.id} card={card} />
    ));
  }, [cards]);
  
  return (
    <Box sx={{ mt: 4 }} data-testid="card-list">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Your Cards ({cards.length}/10)
      </Typography>
      
      {cards.length === 0 ? (
        <Typography variant="body1" color="text.secondary" data-testid="no-cards-message">
          No cards generated yet. Use the generator above to create your first card.
        </Typography>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3,
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}>
          {cardsList}
        </Box>
      )}
    </Box>
  );
};

export default React.memo(CardList);
