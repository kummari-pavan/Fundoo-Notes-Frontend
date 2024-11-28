import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { archiveApiCall, trashApiCall } from '../../utils/Api';
import { Popper, Paper } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import Menu from '@mui/material/Menu';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  outline: 'none',
};

const IconContainer = styled('div')({
  display: 'flex',
  gap: '15px',
  position: 'absolute',
  bottom: '16px',
  left: '16px',
});

const CloseTextButton = styled('span')({
  position: 'absolute',
  bottom: '16px',
  right: '16px',
  fontSize: '0.9rem',
  color: 'gray',
  cursor: 'pointer',
  '&:hover': {
    color: 'black',
  },
});

function NoteCard({ noteDetails, onArchive, onTrash }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(noteDetails.title);
  const [description, setDescription] = useState(noteDetails.description);
  const [colorMenuAnchor, setColorMenuAnchor] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(noteDetails.color || '#FFFFFF');
  const titleRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setTitle(noteDetails.title);
    setDescription(noteDetails.description);
    setBackgroundColor(noteDetails.color || '#FFFFFF');
  }, [noteDetails]);

  const handleIconClick = async (action) => {
    if (action === 'archive') {
      const response = await archiveApiCall(`notes/${noteDetails._id}/archive`);
      console.log(response);
      if (response.status === 200) {
        onArchive(noteDetails._id); // Update parent state to archive
      }
    } else if (action === 'trash') {
      const response1 = await trashApiCall(`notes/${noteDetails._id}/trash`);
      console.log(response1);
      if (response1.status === 200) {
        onTrash(noteDetails._id); // Update parent state to trash
      }
    }
  };

  const handleColorMenuOpen = (event) => {
    setColorMenuAnchor(event.currentTarget);
  };

  const handleColorMenuClose = () => {
    setColorMenuAnchor(null);
  };

  const handleColorChange = (color) => {
    console.log('Color changed to:', color);
    setBackgroundColor(color); // Update background color state
    handleColorMenuClose();
  };

  const colors = [
    '#FFB6C1', '#B2EBF2', '#FFFACD', '#D3F8E2', '#F0E68C',
    '#FFEB3B', '#FFD700', '#E0BBE4', '#F5F5F5', '#FF6347',
    '#98FB98', '#AFEEEE', '#FF1493', '#DA70D6', '#FFE4E1',
    '#DDA0DD', '#90EE90', '#ADD8E6',
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          paddingLeft: '14px',
          paddingRight: '14px',
          border: '1px solid lightgray',
          borderRadius: '8px',
          marginBottom: '16px',
          cursor: 'pointer',
          overflow: 'hidden',
          backgroundColor: backgroundColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.querySelector('.icon-container').style.display = 'flex';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector('.icon-container').style.display = 'none';
        }}
      >
        <h4>{title}</h4>
        <p>{description}</p>

        <IconContainer className="icon-container" style={{ display: 'none' }}>
          {noteDetails.isArchived ? (
            <IconButton onClick={() => handleIconClick('unarchive')}>
              <UnarchiveOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleIconClick('archive')}>
              <ArchiveOutlinedIcon />
            </IconButton>
          )}

          <IconButton onClick={() => handleIconClick('trash')}>
            <DeleteOutlineIcon />
          </IconButton>

          <IconButton onClick={handleColorMenuOpen}>
            <PaletteOutlinedIcon />
          </IconButton>
        </IconContainer>
      </div>

      <Menu
        anchorEl={colorMenuAnchor}
        open={Boolean(colorMenuAnchor)}
        onClose={handleColorMenuClose}
      >
        {colors.map((color, index) => (
          <MenuItem
            key={index}
            onClick={() => handleColorChange(color)}
            style={{ backgroundColor: color }}
          >
            {color}
          </MenuItem>
        ))}
      </Menu>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalStyle}
      >
        <Box>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <CloseTextButton onClick={handleClose}>Close</CloseTextButton>
        </Box>
      </Modal>
    </>
  );
}

export default NoteCard;
