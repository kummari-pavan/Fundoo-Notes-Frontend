// import React,{useState,useEffect} from 'react';
// import {fetchNotes} from '../../utils/Api';
// import EmptyNotes from './EmptyNotes';
// import NoteCard from './NoteCard'
// import './Notes.scss'

// const Notes =()=>{
//     const[notesData,setNotesData]=useState([])

    
//     useEffect(()=>{
//         const fetchingNotes=async ()=>{
//             try{
//                 const notes = await fetchNotes();
//                 console.log(notes.data);
//                 setNotesData(notes.data)
//             }
//             catch(err){
//                 console.error("Error:",err);

//             };

//         }
//         fetchingNotes();
//     },[]);

//     return(
//     <div className="notes-container">
//       {notesData.length > 0 ? (
//         <div className="note-card-grid">
//           {notesData.map((note) => (
//             <NoteCard key={note._id} noteDetails={note} />
//           ))}
//         </div>
//       ) : (
//         <EmptyNotes />
//       )}
//     </div>
//     )
// }

// export default Notes;

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchNotes } from '../../utils/Api';
import AddNoteForm from './AddNoteForm';
import EmptyNotes from './EmptyNotes';
import NoteCard from './NoteCard';
import './Notes.scss';


const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {
    const [notesData, setNotesData] = useState([]);

    useEffect(() => {
        const fetchingNotes = async () => {
            try {
                const notes = await fetchNotes();
                console.log('Fetched Notes:', notes.data);
                setNotesData(notes.data);
            } catch (err) {
                console.error('Error fetching notes:', err);
            }
        };
        fetchingNotes();
    }, []);

     const handleNoteAdded = (newNote) => {
        setNotesData((prevNotes) => [...prevNotes, newNote]);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ p: 3}}>
                <DrawerHeader />
                <AddNoteForm onNoteAdded={handleNoteAdded} />
                <div className="notes-container">
                    {notesData.length > 0 ? (
                        <div className="note-card-grid">
                            {notesData.map((note) => (
                                <NoteCard key={note._id} noteDetails={note} />
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

export default Notes;
