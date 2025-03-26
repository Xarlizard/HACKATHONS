import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const AssetDetails = React.memo(({ asset }) => {
  return (
    <Box sx={{ mt: 4, p: 3, backgroundColor: "#f1f1f1", borderRadius: 1 }}>
      <Typography variant="h6">Asset Details</Typography>
      <Typography>Name: {asset.name}</Typography>
      <Typography>Type: {asset.type}</Typography>
      <Typography>Value: ${asset.value.toFixed(2)}</Typography>
      <Typography>Daily Change: {asset.dailyChange.toFixed(2)}%</Typography>

      <List
        sx={{
          mt: 2,
          maxHeight: 200,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
        }}
      >
        {asset.history.map((entry, index) => (
          <ListItem key={index} dense>
            <ListItemText
              primary={`Date: ${new Date(
                entry.date
              ).toLocaleDateString()} | Value: $${entry.value.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

AssetDetails.displayName = "AssetDetails";

export default AssetDetails;
