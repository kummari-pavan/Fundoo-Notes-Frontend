import React, { useState } from 'react';
import { Box, InputBase, IconButton, Modal, TextField, Paper } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import './NotesContainer.scss'; 

function NotesContainer() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [note, setNote] = useState({
        title: '',
        description: ''
    });

    const handleOpen = () => setIsExpanded(true);
    const handleClose = () => setIsExpanded(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }));
    };

    return (
        <div className="notes-container">
            <Paper 
                elevation={3} 
                className="input-bar" 
                onClick={handleOpen}
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px 16px', 
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                <InputBase
                    placeholder="Take a note..."
                    fullWidth
                    sx={{ flex: 1 }}
                    disabled
                />
                <IconButton><AddIcon /></IconButton>
                <IconButton><EditIcon /></IconButton>
                <IconButton><ImageIcon /></IconButton>
            </Paper>

            <Modal
                open={isExpanded}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid hwb(16 14% 2%);;',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px'
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Title"
                        fullWidth
                        name="title"
                        value={note.title}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Take a note..."
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        value={note.description}
                        onChange={handleChange}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <IconButton onClick={handleClose}><DoneIcon /></IconButton>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default NotesContainer;
