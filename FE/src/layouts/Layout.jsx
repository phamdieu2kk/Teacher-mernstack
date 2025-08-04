// src/layouts/Layout.jsx
import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Sidebar from '../components/Sidebar';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format: 16/10/2024 11:23:07
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      setCurrentDateTime(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`);
    };

    updateDateTime(); // Set immediately on mount
    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Header (AppBar) */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#fff', // White background as in image
          color: '#000', // Black text
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.05), 0px 4px 5px 0px rgba(0,0,0,0.02), 0px 1px 10px 0px rgba(0,0,0,0.01)', // Subtle shadow
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            School System
          </Typography>

          <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
            {currentDateTime}
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
            Hệ: 1
          </Typography>
          <Typography variant="body1" sx={{ mr: 1, fontWeight: 'medium' }}>
            Admin
          </Typography>
          <IconButton color="inherit" size="small">
            <AccountCircle sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px', // Pushes content down to clear the AppBar
          backgroundColor: '#f9f9f9', // Light background for content area
          minHeight: 'calc(100vh - 64px)', // Ensure content area fills remaining height
        }}
      >
        {children} {/* This is where your page components will be rendered */}
      </Box>
    </Box>
  );
};

export default Layout;