import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { ToastProps } from '../types/types';

const Toast: React.FC<ToastProps> = ({ open, message, onClose, type='success' }) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} className='toast-alert'>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;