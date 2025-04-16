import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CardsContext = createContext();

export const useCards = () => useContext(CardsContext);

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  const addCard = (card) => {
    if (cards.length >= 10) {
      return false; // Cannot add more than 10 cards
    }
    
    const newCard = {
      ...card,
      id: uuidv4() // Generate unique ID
    };
    
    setCards((prevCards) => [...prevCards, newCard]);
    return true;
  };

  const removeCard = (id) => {
    setCards((prevCards) => prevCards.filter(card => card.id !== id));
  };

  const getCards = () => {
    return cards;
  };

  const value = {
    cards,
    addCard,
    removeCard,
    getCards
  };

  return (
    <CardsContext.Provider value={value}>
      {children}
    </CardsContext.Provider>
  );
};

export default CardsContext;
