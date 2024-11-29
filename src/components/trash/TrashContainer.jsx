import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchTrashNotes } from '../../utils/Api';
import EmptyTrash from './EmptyTrash';
import NoteCard from '../notes/NoteCard';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const TrashNotesContainer = () => {
    const [trashNotesData, setTrashNotesData] = useState([]);

    useEffect(() => {
        const fetchingNotes = async () => {
            try {
                const trashNotes = await fetchTrashNotes();
                console.log('Fetched Notes:', trashNotes.data.data);
                setTrashNotesData(trashNotes.data.data);
                console.log("----------------",trashNotesData);
            } catch (err) {
                console.error('Error fetching notes:', err);
            }
        };
        fetchingNotes();
    }, []);

    // const handleTrashToggle = (id, newStatus) => {
    //     setTrashNotesData((prevData) =>
    //       prevData.map((note) =>
    //         note._id === id ? { ...note, isArchived: newStatus } : note
    //       )
    //     );
    //   };

    const handleNotesList = (data, action) => {
        console.log(data);
    
        if(action== "restore" || action== "deleteForever"){
            setTrashNotesData(trashNotesData.filter((note) => note._id !== data._id))
        }
        else if(action== "color") {
    
            const updatedList = trashNotesData.map((note) => {
              if(note.id == data.id) {
                return data
              }
              return note
            })
            setTrashNotesData(updatedList)
        }    
            
    }
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ p: 3}}>
                <DrawerHeader />
                <div className="notes-container">
                    {trashNotesData.length > 0 ? (
                        <div className="note-card-grid">
                            {trashNotesData.map((note) => (
                                <NoteCard key={note._id} noteDetails={note} updateNoteList={handleNotesList}/>
                            ))}
                        </div>
                    ) : (
                        <EmptyTrash />
                    )}
                </div>
            </Box>
        </Box>
    );
};

export default TrashNotesContainer;

