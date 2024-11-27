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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ p: 3}}>
                <DrawerHeader />
                <div className="notes-container">
                    {trashNotesData.length > 0 ? (
                        <div className="note-card-grid">
                            {trashNotesData.map((note) => (
                                <NoteCard key={note._id} noteDetails={note} />
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
