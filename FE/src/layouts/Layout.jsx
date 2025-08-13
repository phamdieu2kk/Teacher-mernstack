import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const drawerWidth = 180;
const appBarHeight = 64;

const Layout = ({ children }) => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f7fa' }}>
      <CssBaseline />
      
      {/* Header sẽ nằm trên cùng */}
      <Header dateTime={dateTime} />
      
      {/* Sidebar và nội dung chính */}
      <Box sx={{ display: 'flex', flexGrow: 1, mt: `${appBarHeight}px` }}> {/* mt để đẩy nội dung xuống dưới header */}
        <Sidebar />
        
        {/* Nội dung chính của trang */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: 'auto',
            width: `calc(100% - ${drawerWidth}px)`, // Căn chỉnh kích thước nội dung
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;