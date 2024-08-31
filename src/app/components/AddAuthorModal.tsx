import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AddAuthorModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    await onSubmit(name);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
        >
            <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">
            Add Author
        </Typography>
        <TextField
          fullWidth
          label="Author Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddAuthorModal;