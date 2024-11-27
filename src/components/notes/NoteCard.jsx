// import { Card, CardContent, CardActions, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

// const StyledCard = styled(Card)`
//     border: 1px solid red;
//     border-radius: 8px;
//     margin: 8px;
//     box-shadow: none;
//     padding:5px
// `

// const NoteCard = ({ noteDetails }) => {

//     console.log(noteDetails)
//     const archiveNote = (noteDetails) => {
       
//     }
//     const deleteNote = (noteDetails) => {
       
//     }

//     return (
//         <StyledCard>
//             <div className='card-container'>
//                 <CardContent >
//                     <Typography>{noteDetails.title}</Typography>
//                     <Typography>{noteDetails.description}</Typography>
//                 </CardContent>
//                 <CardActions>
//                     <Archive 
//                         fontSize="small" 
//                         style={{ marginLeft: 'auto' }} 
//                         onClick={() => archiveNote(noteDetails)}
//                     />
//                     <Delete 
//                         fontSize="small"
//                         onClick={() => deleteNote(noteDetails)}
//                     />
//                 </CardActions>
//             </div>
//         </StyledCard>
//     )
// }

// export default NoteCard;

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
//function NoteCard({ noteDetails,props }) --> conditional rend
function NoteCard({ noteDetails }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(noteDetails.title);
  const [description, setDescription] = useState(noteDetails.description);
  const titleRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    setTitle(noteDetails.title);
    setDescription(noteDetails.description);
  }, [noteDetails]);

 
  return (
    <>
      <div
        style={{
          display:'flex',
          flexDirection:'column',
          position: 'relative',
          paddingLeft: '14px',
          paddingRight: '14px',
          border: '1px solid lightgray',
          borderRadius: '8px',
          marginBottom: '16px',
          cursor: 'pointer',
          overflow: 'hidden', 
        }}
        onMouseEnter={(e) => {
          e.currentTarget.querySelector(".hover-icons").style.opacity = 1;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector(".hover-icons").style.opacity = 0;
        }}
        onClick={handleOpen}
      >
        <div  style={{
          display:'flex',
          flexDirection:'column',
          marginBottom:'25px',
        }} >
        <h4>{noteDetails.title}</h4>
        <p>{noteDetails.description}</p>
        </div>

        <div
          className="hover-icons"
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            display: 'flex',
            gap: '15px',
            opacity: 0, 
            transition: 'opacity 0.3s ease',
            marginTop:'10px'
          }}
        >
          <IconButton size="small">
            <ArchiveOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <PaletteOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="note-modal-title">
        <Box sx={modalStyle}>
          <TextField
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputRef={titleRef}
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              fontSize: '1.5rem',
              mb: 2,
              '& .MuiInputBase-input': {
                padding: 0,
              },
            }}
          />
          <TextField
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              fontSize: '1rem',
              color: 'gray',
              '& .MuiInputBase-input': {
                padding: 0,

              },
              marginBottom:"18px"
            }}
          />
          <IconContainer sx={{
            }}>
            <IconButton size="small">
              <ArchiveOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <PaletteOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </IconContainer>
          <CloseTextButton onClick={handleClose}>Close</CloseTextButton>
        </Box>
      </Modal>
    </>
  );
}

export default NoteCard;
