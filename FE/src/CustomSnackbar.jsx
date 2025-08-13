import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const STATUS_SUCCESS_BG = '#3fac45';  
const STATUS_ERROR_BG = '#f44506';   
const STATUS_DEFAULT_BG = '#7b1fa2';  

const CustomSnackbar = ({ open, message, severity = 'success', onClose }) => {
  const backgroundColor =
    severity === 'success'
      ? STATUS_SUCCESS_BG
      : severity === 'error'
      ? STATUS_ERROR_BG
      : STATUS_DEFAULT_BG;

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        mt: 5.5,
        width: 370,
        '& .MuiAlert-root': {
          backgroundColor: backgroundColor,
          border: 'none',
          color: '#ffffff',
          boxShadow: 'none',
          fontWeight: 600,
        },
        '& .MuiAlert-icon': {
          color: '#ffffff',   
          fontSize: 24,
        },
       
        '& .MuiAlert-action': {
          color: '#ffffff',   
          '& .MuiSvgIcon-root': {
            fontSize: 20,     
          },
          '&:hover': {
            color: '#e0e0e0',
          },
        },
      }}
    >
      <Alert severity={severity} sx={{ width: '100%' }} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
