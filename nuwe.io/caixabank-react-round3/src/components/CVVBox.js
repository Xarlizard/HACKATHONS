import React from "react";
import { Box, Typography } from "@mui/material";

const CVVBox = ({ cvv }) => {
  return (
    <>
      <Box
        data-testid="card-back-cvv-box"
        sx={{
          width: "80%",
          height: 40,
          backgroundColor: "white",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          fontWeight: "bold",
          marginTop: 12,
        }}
      >
        <Typography data-testid="card-back-cvv" variant="h6">
          {}
        </Typography>
      </Box>
      <Typography data-testid="card-back-cvv-label" variant="caption" sx={{ marginTop: 1 }}>
        CVV
      </Typography>
    </>
  );
};

export default CVVBox;
