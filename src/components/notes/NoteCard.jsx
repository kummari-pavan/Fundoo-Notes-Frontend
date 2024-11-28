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
import { archiveApiCall,trashApiCall ,deleteApiCall} from '../../utils/Api';
import {Popper, Paper} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import { useLocation,useNavigate } from 'react-router-dom';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';

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
function NoteCard({ noteDetails,onArchive,onTrash }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(noteDetails.title);
  const [description, setDescription] = useState(noteDetails.description);
 const [colorMenuAnchor, setColorMenuAnchor] = useState(null);
 const [backgroundColor, setBackgroundColor] = useState(noteDetails.color || '#FFFFFF');
  const titleRef = useRef(null);
  const location123=useLocation()

  const isArchive = noteDetails.isArchive;
  const isTrash = noteDetails.isTrash;

  const navigate=useNavigate()
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  useEffect(()=>{
    console.log(location123)

  },[])

  useEffect(() => {
    setTitle(noteDetails.title);
    setDescription(noteDetails.description);
    setBackgroundColor(noteDetails.color || '#FFFFFF');
  }, [noteDetails]);

  const handleIconClick = async(action)=>{
    if(action==='archive' || action === 'unarchive'){
        const response= await archiveApiCall(`notes/${noteDetails._id}/archive`);
        console.log(response);
        if (response.status === 200) {
      
          onArchive(noteDetails._id);
          navigate("/dashboard/archive")
        }
    }
    else if(action==='trash' || action === 'restore'){
      const response1= await trashApiCall(`notes/${noteDetails._id}/trash`);
      console.log(response1)
      if (response1.status === 200) {
        onTrash(noteDetails._id);
        navigate("/dashboard/trash")
      }  
    }
    else if (action === 'deleteForever') {
      const response = await  deleteApiCall(`notes/${noteDetails._id}/`)
      if (response.status === 200) {
        //onPermanentDelete(noteDetails._id);
        console.log("Note Deleted",noteDetails.title)
        navigate("/dashboard/trash")
      }
    } 

  }

   const handleColorMenuOpen = (event) => {
    setColorMenuAnchor(event.currentTarget); 
  };

  const handleColorMenuClose = () => {
    setColorMenuAnchor(null); 
  };

  const handleColorChange = (color) => {
    console.log('Color changed to:', color);
    setBackgroundColor(color);// Update the background color state
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
        style={{ display:'flex',flexDirection:'column',position: 'relative',paddingLeft: '14px',paddingRight: '14px',border: '1px solid lightgray', borderRadius: '8px', marginBottom: '16px', cursor: 'pointer', overflow: 'hidden',backgroundColor: backgroundColor,  }}
        onMouseEnter={(e) => {
          e.currentTarget.querySelector(".hover-icons").style.opacity = 1;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector(".hover-icons").style.opacity = 0;
        }}
        onClick={handleOpen}
      >
        <div  style={{display:'flex' ,flexDirection:'column', marginBottom:'40px',}} >
        <h4>{noteDetails.title}</h4>
        <p>{noteDetails.description}</p>
        </div>

        <div className="hover-icons" style={{position: 'absolute', bottom: '16px', left: '16px',  display: 'flex', gap: '15px', opacity: 0,  transition: 'opacity 0.3s ease', marginTop:'10px'}}onClick={handleClose}>

          {/*[PAVAN] Conditional Rendering For trash and untrash  ---------------------------------------------------------------*/}

          {isTrash ? (
            <>
              <Tooltip title="Restore">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIconClick('restore');
                  }}
                >
                  <Restore fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Forever">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIconClick('deleteForever');
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
               {/*[PAVAN] Conditional Rendering For archive and Archive ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
              {isArchive ? (
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleIconClick('unarchive'); }}>
              <UnarchiveOutlinedIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleIconClick('archive'); }}>
              <ArchiveOutlinedIcon fontSize="small" />
            </IconButton>
          )}
          
          <IconButton size="small">
            <DeleteOutlineIcon fontSize="small"
            onClick={(e) => { e.stopPropagation(); handleIconClick('trash'); }}/>
          </IconButton>
          
          <IconButton size="small">
            <PaletteOutlinedIcon fontSize="small"  onClick={(e) => { e.stopPropagation(); handleColorMenuOpen(e); }}/>
          </IconButton>
          <IconButton size="small"  >
            <EditOutlinedIcon fontSize="small" onClick={(e) => { e.stopPropagation(); }} />
          </IconButton>
            </>
          )}


        </div>
        
      </div>


      <Popper open={Boolean(colorMenuAnchor)} anchorEl={colorMenuAnchor} placement="bottom-start">
          <Paper elevation={3} style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', width: '220px', borderRadius: '6px', }}>
            {colors.map((color, index) => (
              <MenuItem key={index} onClick={() => handleColorChange(color)} style={{ backgroundColor:color, width: '20px' ,height: '20px',borderRadius: '4px', margin: '2px',padding: '0', minWidth: '0',display: 'inline-block'}} />
            ))}
          </Paper>
        </Popper>
        
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
            <ArchiveOutlinedIcon fontSize="small"
            onClick={()=>{handleIconClick('archive')}} 
  
            />
            </IconButton>
            <IconButton size="small">
              <DeleteOutlineIcon fontSize="small"
              onClick={()=>{handleIconClick('trash')}} 
               />
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
