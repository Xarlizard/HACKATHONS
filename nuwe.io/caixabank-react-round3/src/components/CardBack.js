import React from "react";
import { Box, Typography } from "@mui/material";
import { getNotch } from "../utils/getNotch";
import CardStripe from "./CardStripe";
import CVVBox from "./CVVBox";

const CardBack = ({ card, fontFamily }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: fontFamily || "Arial",
        color: "white",
        clipPath: card.notchBack,
      }}
      data-testid="card-back"
    >
      <CardStripe />
      
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", mt: 3 }}>
        <CVVBox cvv={card.cvv} fontFamily={fontFamily} />
        <Typography variant="caption" sx={{ mt: 1 }}>
          CVV
        </Typography>
      </Box>
      
      <Box sx={{ mt: "auto", display: "flex", justifyContent: "center" }}>
        <img 
          src="/nuwe-logo.png" 
          alt="NUWE Logo" 
          style={{ height: "30px" }}
          data-testid="nuwe-logo"
        />
      </Box>
    </Box>
  );
};

export default React.memo(CardBack);
