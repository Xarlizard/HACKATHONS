import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, Box, ListItemIcon } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = async () => {
    try {
      await logoutUser();
      handleLogout();
      handleMenuClose();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar data-testid="navbar" position="static" sx={{ bgcolor: "#00a1e0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <img src="/caixabank-icon.png" alt="CaixaBank logo" style={{ width: 80 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          The Hack is ON
        </Typography>
        {user && (
          <>
            <Box 
              data-testid="navbar-user" 
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} 
              onClick={handleMenuOpen}
            >
              <Avatar
                data-testid="navbar-user-avatar"
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: "#ffffff",
                  color: "#00a1e0",
                }}
              />
              <Typography 
                data-testid="navbar-user-username" 
                variant="body1" 
                sx={{ ml: 1, color: "#ffffff" }}
              >
                {user.username}
              </Typography>
            </Box>
            <Menu 
              data-testid="navbar-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem 
                data-testid="navbar-menu-item-logout" 
                onClick={handleLogoutClick}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
