import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { set } from 'zod';

interface AddAuthorModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (firstName: string, lastName: string) => void;
}

const AddAuthorModal: React.FC<AddAuthorModalProps> = ({ open, onClose, onSubmit }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleSubmit = async () => {
        const capitalizedFirstName = capitalizeFirstLetter(firstName);
        const capitalizedLastName = capitalizeFirstLetter(lastName);
        await onSubmit(capitalizedFirstName, capitalizedLastName);
        setFirstName('');
        setLastName('');
    };

    return (
        <Modal open={open} onClose={onClose}>
        <Box className="modal-box">
            <IconButton
                aria-label="close"
                onClick={onClose}
                className="modal-close-button"
            >
                <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="h2">
                Add Author
            </Typography>
            <TextField
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="modal-text-field"
            />
            <TextField
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="modal-text-field"
            />
            <Button variant="contained" onClick={handleSubmit} className="modal-submit-button">
                Submit
            </Button>
        </Box>
        </Modal>
    );
};

export default AddAuthorModal;