import React, { useState } from 'react';
import { Box, InputBase, IconButton, Modal, TextField, Paper } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PaletteIcon from '@mui/icons-material/Palette';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import './AddNoteForm.scss'; 
function AddNoteForm() {
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
        <>
        <div className="notes-body">
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
                        cursor: 'pointer',
                    }} >
                    <InputBase placeholder="Take a note..." fullWidth sx={{ flex: 1,cursor: 'pointer' }} onClick={handleOpen} />
                    <IconButton><AddIcon /></IconButton>
                    <IconButton><EditIcon /></IconButton>
                    <IconButton><ImageIcon /></IconButton>
                </Paper>

                <Modal
                    open={isExpanded}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description" >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid;',
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
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 3,
                            }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton><NotificationsIcon /></IconButton>
                                <IconButton><PersonAddIcon /></IconButton>
                                <IconButton><PaletteIcon /></IconButton>
                                <IconButton><ArchiveIcon /></IconButton> 
                                <IconButton><MoreVertIcon /></IconButton>
                                <IconButton><UndoIcon /></IconButton>
                                <IconButton><RedoIcon /></IconButton>
                            </Box>
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                            <IconButton onClick={handleClose}><DoneIcon /></IconButton>
                        </Box>
                        </Box>                        
                    </Box>
                </Modal>
            </div>
        </div> 
        </>
    );
    
}

export default AddNoteForm;
