import React from "react";
import { Box, Typography } from "@mui/material";
import ContactlessIcon from "./ContactlessIcon";
import CardChip from "./CardChip";
import { getNotch } from "../utils/getNotch";

const CardFront = ({ card, fontFamily }) => {
  // Format card number in groups of 4 digits
  const formatCardNumber = (number) => {
    if (!number) return '•••• •••• •••• ••••';
    
    return number.match(/.{1,4}/g).join(' ');
  };
  
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: fontFamily || "Arial",
        color: "white",
        clipPath: card.notchFront,
      }}
      data-testid="card-front"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <img 
          src="/caixabank-tech-logo.png" 
          alt="CaixaBank Tech Logo" 
          style={{ height: "30px" }}
          data-testid="bank-logo"
        />
        <Typography variant="subtitle2" data-testid="card-type">
          {card.type?.toUpperCase() || "CARD"}
        </Typography>
      </Box>
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <CardChip />
        <Box sx={{ ml: 2 }}>
          <ContactlessIcon />
        </Box>
      </Box>
      
      <Typography 
        variant="h5" 
        sx={{ 
          textAlign: "center", 
          letterSpacing: "2px",
          my: 2,
          fontFamily: "inherit"
        }}
        data-testid="card-number"
      >
        {formatCardNumber(card.number)}
      </Typography>
      
      <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" data-testid="cardholder-name">
          JOHN DOE
        </Typography>
        <Typography variant="body2" data-testid="expiration-date">
          {card.expiration || "MM/YYYY"}
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(CardFront);
