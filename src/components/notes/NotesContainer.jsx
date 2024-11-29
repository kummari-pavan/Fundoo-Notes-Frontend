import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchNotes,archiveApiCall } from '../../utils/Api';
import AddNoteForm from './AddNoteForm';
import EmptyNotes from './EmptyNotes';
import NoteCard from './NoteCard';
import './NotesConatiner.scss'


const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const NotesContainer = () => {
    const [notesData, setNotesData] = useState([]);

    useEffect(() => {
        const fetchingNotes = async () => {
            try {
                const notes = await fetchNotes();
                console.log('Fetched Notes:', notes.data.data);
                setNotesData(notes.data.data);
                console.log("----------------",notesData);
            } catch (err) {
                console.error('Error fetching notes:', err);
            }
        };
        fetchingNotes();
    }, []);

    //  const handleNoteAdded = (newNote) => {
    //     setNotesData((prevNotes) => [newNote,...prevNotes]);
    // };

    const handleNotesList = (data, action) => {
        console.log(data);
        // setNotesList(data)
        if(action == "add") setNotesData([...notesData, data])
        else if(action== "archive" || action== "trash"){
           setNotesData(notesData.filter((note) => note._id !== data._id))
        }
        else if(action== "color" || action=="edit") {

            const updatedList = notesData.map((note) => {
              if(note._id == data._id) {
                return data
              }
              return note
            })
            setNotesData(updatedList)
        }    
            
    }
    // const handleArchiveNote = (noteId) => {
    //     setNotesData((prevNotes) =>
    //         prevNotes.filter((note) => note._id !== noteId && note.isArchive === false  && note.isTrash === false)
    //     );
    // };
   
    // const handleTrashNote = (noteId) => {
    //     setNotesData((prevNotes) =>
    //         prevNotes.filter((note) => note._id !== noteId && note.isArchive === false  && note.isTrash === false)
    //     );
    // };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ p: 3}}>
                <DrawerHeader />
                <AddNoteForm onNoteAdded={handleNotesList} />
                <div className="notes-container">
                    {notesData.length > 0 ? (
                        <div className="note-card-grid">

                            {notesData.filter((note) => !note.isArchive && note.isTrash === false).map((note) => (
                                <NoteCard key={note._id} noteDetails={note} updateNoteList={handleNotesList}/>
                            ))}
                            
                        </div>
                    ) : (
                        <EmptyNotes />
                    )}
                </div>
            </Box>
        </Box>
    );
};

export default NotesContainer;

