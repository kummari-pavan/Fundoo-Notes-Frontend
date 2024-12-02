import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { archiveApiCall,trashApiCall ,deleteApiCall,colourApiCall,updateNotesApiCall} from '../../utils/Api';
import {Popper, Paper,ClickAwayListener} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import { useLocation,useNavigate } from 'react-router-dom';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const modalStyle = {position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400, bgcolor: 'background.paper',boxShadow: 24,p: 4,borderRadius: '8px',outline: 'none',};

const IconContainer = styled('div')({display: 'flex',gap: '15px',position: 'absolute',bottom: '16px',left: '16px',});

const CloseTextButton = styled('span')({position: 'absolute',bottom: '16px',right: '16px',fontSize: '0.9rem',color: 'gray',cursor: 'pointer','&:hover': {color: 'black' },});

//function NoteCard({ noteDetails,props }) --> conditional rend
function NoteCard({ noteDetails,updateNoteList }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(noteDetails.title);
  const [description, setDescription] = useState(noteDetails.description);
  const [colorMenuAnchor, setColorMenuAnchor] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(noteDetails.color || '#FFFFFF');
  const [isHovered, setIsHovered] = useState(false);
  const [modalColorMenuAnchor, setModalColorMenuAnchor] = useState(null);
  const titleRef = useRef(null);
  const location123=useLocation()

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const isArchive = noteDetails.isArchive;
  const isTrash = noteDetails.isTrash;
  
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
    // const updateDta ={...noteDetails,title,description,color}
    updateNotesApiCall(`notes/${noteDetails._id}`,{title,description,color:backgroundColor})
    updateNoteList({...noteDetails,title,description },"edit");
  }

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
          updateNoteList(noteDetails,action);
        }
    }
    else if(action==='trash' || action === 'restore'){
      const response= await archiveApiCall(`notes/${noteDetails._id}/archive`);
      const response1= await trashApiCall(`notes/${noteDetails._id}/trash`);
      console.log(response1)
      if (response1.status === 200) {
        updateNoteList(noteDetails,action);
      }  
    }
    else if (action === 'deleteForever') {
      const response = await  deleteApiCall(`notes/${noteDetails._id}/`)
      if (response.status === 200) {
        updateNoteList(noteDetails,action)
        console.log("Note Deleted",noteDetails.title)
      }
    } 
  }
  const handleColorMenuOpen = (event) => {
    setColorMenuAnchor(event.currentTarget); 
  };
  const handleColorMenuClose = () => {
    setColorMenuAnchor(null); 
  };

  // Scoped handler for modal color menu
const handleModalColorMenuOpen = (event) => {
  setModalColorMenuAnchor(event.currentTarget);
};

const handleModalColorMenuClose = () => {
  setModalColorMenuAnchor(null);
};

  const handleColorChange = (color) => {
    colourApiCall(`notes/${noteDetails._id}`,{color:color})
    console.log('Color changed to:', color);
    updateNoteList({...noteDetails,color:color},"color")
    handleColorMenuClose(); 
  };
  const colors = [
    '#F8F9FA', '#FDFEFE', '#EBF5FB', '#E8F8F5', '#F5EEF8', 
    '#FAF2E9', '#F9EBEA', '#EAECEE', '#FDEDEC', 
    '#FFDEE9', '#B5FFFC', '#FFFCF2', '#D3CCE3', '#E9E4F0',
    '#FFEBE0', '#F7D9C4', '#D0F4DE', '#A3D5D3' 
  ];
  return (
    <>
      <div
        style={{ display:'flex',flexDirection:'column',position: 'relative',paddingLeft: '14px',paddingRight: '14px',border: '1px solid lightgray', borderRadius: '8px', marginBottom: '16px', cursor: 'pointer', overflow: 'hidden',backgroundColor:backgroundColor,  }}
        onMouseEnter={(e) => {
          e.currentTarget.querySelector(".hover-icons").style.opacity = 1;
          setIsHovered(true)
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector(".hover-icons").style.opacity = 0;
          setIsHovered(false)
        }}

        onClick={handleOpen} >
        <div  style={{display:'flex' ,flexDirection:'column', marginBottom:'40px',}} >
        <h4>{noteDetails.title}</h4>
        <p>{noteDetails.description}</p>
        </div>
        {isHovered && (
          <img
          src={`${process.env.PUBLIC_URL}/images/pin1.png`}  // Replace with your image URL
            alt="Image"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '24px',
              height: '28px',
            }}
          />
        )}
        <div className="hover-icons" style={{position: 'absolute', bottom: '16px', left: '16px',  display: 'flex', gap: '15px', opacity: 0,  transition: 'opacity 0.3s ease', marginTop:'10px'}}onClick={handleClose}>
          {/*[PAVAN] Conditional Rendering For trash and untrash  ---------------------------------------------------------------*/}
          {isTrash ? (
            <>
              <Tooltip title="Restore">
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleIconClick('restore');}}>
                  <Restore fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Forever">
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleIconClick('deleteForever');}}>
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

              <Tooltip title= {formatDate(noteDetails.createdAt)}>
              <IconButton size="small">
                <AccessTimeIcon fontSize="small"  onClick={(e) => { e.stopPropagation() }}/>
              </IconButton>
              </Tooltip>
              
            </>
          )}
        </div>   
      </div>
      <Popper open={Boolean(colorMenuAnchor)} anchorEl={colorMenuAnchor} placement="bottom-start">
          <ClickAwayListener onClickAway={handleColorMenuClose}>
          <Paper elevation={3} style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', width: '220px', borderRadius: '6px', }}>
            {colors.map((color, index) => (
              <MenuItem key={index} onClick={() => handleColorChange(color)} style={{ backgroundColor:color, width: '20px' ,height: '20px',borderRadius: '4px', margin: '2px',padding: '0', minWidth: '0',display: 'inline-block'}} />
            ))}
          </Paper>
          </ClickAwayListener>
      </Popper>
        
      <Modal open={open} onClose={handleClose} aria-labelledby="note-modal-title">
        <Box sx={modalStyle} style={{backgroundColor:backgroundColor}}>
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
          <IconContainer>
            <IconButton size="small">
              <ArchiveOutlinedIcon fontSize="small"
              onClick={()=>{handleIconClick('archive')}} />
            </IconButton>
            <IconButton size="small">
              <DeleteOutlineIcon fontSize="small"
               onClick={()=>{handleIconClick('trash')}} />
            </IconButton>
            <IconButton size="small"  onClick={(e) => { e.stopPropagation(); handleModalColorMenuOpen(e)}}>
              <PaletteOutlinedIcon fontSize="small"  />
            </IconButton>
          </IconContainer>
          <Popper
            open={Boolean(modalColorMenuAnchor)}
            anchorEl={modalColorMenuAnchor}
            placement="bottom-start"
            style={{ zIndex: 1301 }} // Ensure it's above the modal
          >
            {modalColorMenuAnchor && ( // Render content only if anchorEl exists
            <ClickAwayListener onClickAway={handleModalColorMenuClose}>
              <Paper
                elevation={3}
                style={{
                  padding: '10px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: '220px',
                  borderRadius: '6px',
                }}
              >
                {colors.map((color, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleColorChange(color);
                      handleModalColorMenuClose(); // Close after selecting a color
                    }}
                    style={{
                      backgroundColor: color,
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      margin: '2px',
                      padding: '0',
                      minWidth: '0',
                      display: 'inline-block',
                    }}
                  />
                ))}
              </Paper>
              </ClickAwayListener>
            )}
           
          </Popper>
          
          <CloseTextButton onClick={handleClose}>Close</CloseTextButton>
        </Box>
      </Modal>
      
    </>
  );
}

export default NoteCard;
