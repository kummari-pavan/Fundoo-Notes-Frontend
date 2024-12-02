import React, { useState } from 'react';
import { Box, InputBase, IconButton, Modal, TextField, Paper,
    Popper,
    MenuItem,
    ClickAwayListener } from '@mui/material';
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
import { createNoteApiCall,fetchNotes } from '../../utils/Api'; 
import './AddNoteForm.scss'; 
function AddNoteForm({ onNoteAdded }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [note, setNote] = useState({
        title: '',
        description: '' ,
        color: "#ffffff"
    });

    const handleOpen = () => setIsExpanded(true);
    const handleClose = () => {
        setIsExpanded(false);
        setNote({ title: '', description: '' ,color: "#ffffff" });
    };

    const [colorAnchor, setColorAnchor] = useState(null);

    const colors = [
        '#F8F9FA', '#FDFEFE', '#EBF5FB', '#E8F8F5', '#F5EEF8', 
        '#FAF2E9', '#F9EBEA', '#EAECEE', '#FDEDEC', 
        '#FFDEE9', '#B5FFFC', '#FFFCF2', '#D3CCE3', '#E9E4F0',
        '#FFEBE0', '#F7D9C4', '#D0F4DE', '#A3D5D3' 
      ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }));
    };

    const handleColorMenuToggle = (event) => {
        setColorAnchor(event.currentTarget);
    };
    
    
      const handleColorChange = (color) => {
        setNote((prevNote) => ({ ...prevNote, color }));
        setColorAnchor(null); 
      };

    const handleSave = async () => {
        try {
            const newNote = await createNoteApiCall(note); 
            onNoteAdded(newNote.data.data,"add"); 
            handleClose();
        } catch (error) {
            console.error('Error adding note:', error.message);
        }
    };
    
    return (
        <>                 
            <div className="add-notes-container">
                        <Paper elevation={3} className="input-bar"  onClick={handleOpen} sx={{display: 'flex',  alignItems: 'center', padding: '8px 16px', borderRadius: '8px',cursor: 'pointer',}} >
                            <img src={`${process.env.PUBLIC_URL}/images/buld.jpg`} alt="Logo" style={{ height: "40px", width: "auto",paddingRight:"5px" }}/>
                            <InputBase placeholder="Take a note..." fullWidth sx={{ flex: 1,cursor: 'pointer' }} onClick={handleOpen} />
                            <IconButton><AddIcon /></IconButton>
                            <IconButton><EditIcon /></IconButton>
                            <IconButton><ImageIcon /></IconButton>
                        </Paper>

                        <Modal open={isExpanded} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                            <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: note.color,
                                    // bgcolor: 'background.paper',
                                    border: '2px solid gray;',
                                    boxShadow: 24,
                                    p: 4,
                                    borderRadius: '8px'
                                }} >
                                <TextField
                                    variant="outlined"
                                    placeholder="Title"
                                    fullWidth
                                    name="title"
                                    value={note.title}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }} />
                                <TextField
                                    variant="outlined"
                                    placeholder="Take a note..."
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="description"
                                    value={note.description}
                                    onChange={handleChange} />
                                <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mt: 3, }}>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton><NotificationsIcon /></IconButton>
                                        <IconButton><PersonAddIcon /></IconButton>

                                        <IconButton onClick={handleColorMenuToggle}><PaletteIcon /></IconButton>
                                        <Popper
                                        open={Boolean(colorAnchor)}
                                        anchorEl={colorAnchor}
                                        placement="bottom"
                                        style={{ zIndex: 1300 }} // Ensure it is above other components
                                        >
                                        <ClickAwayListener onClickAway={() => setColorAnchor(null)}>
                                            <Paper
                                            elevation={3}
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                width: "150px",
                                                padding: "8px",
                                                borderRadius: "8px",
                                            }}
                                            >
                                            {colors.map((color, index) => (
                                            <MenuItem
                                                    key={index}
                                                    onClick={() => handleColorChange(color)}
                                                    style={{
                                                        backgroundColor: color,
                                                        width: "24px", 
                                                        height: "24px",
                                                        borderRadius: "50%", 
                                                        margin: "4px",
                                                        padding: "0",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            ))}
                                            </Paper>
                                        </ClickAwayListener>
                                        </Popper>
                                        <IconButton><MoreVertIcon /></IconButton>
                                        <IconButton><UndoIcon /></IconButton>
                                        <IconButton><RedoIcon /></IconButton>
                                    </Box>
                                    <Box display="flex" justifyContent="flex-end" mt={2}>
                                    <IconButton onClick={handleSave}><DoneIcon /></IconButton>
                                </Box>
                                </Box>                        
                            </Box>
                        </Modal>
            </div>            
       </>
    );
    
}

export default AddNoteForm;
