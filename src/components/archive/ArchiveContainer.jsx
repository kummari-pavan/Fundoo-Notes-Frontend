import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchArchiveNotes } from '../../utils/Api';
import EmptyArchive from './EmptyArchive';
import NoteCard from '../notes/NoteCard';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const ArchiveNotesContainer = () => {
    const [archiveNotesData, setArchiveNotesData] = useState([]);

    useEffect(() => {
        const fetchingNotes = async () => {
            try {
                const notes = await fetchArchiveNotes();
                console.log('Fetched Notes:', notes.data.data);
                setArchiveNotesData(notes.data.data);
                console.log("----------------",archiveNotesData);
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
                    {archiveNotesData.length > 0 ? (
                        <div className="note-card-grid">
                            {archiveNotesData.map((note) => (
                                <NoteCard key={note._id} noteDetails={note} />
                            ))}
                        </div>
                    ) : (
                        <EmptyArchive />
                    )}
                </div>
            </Box>
        </Box>
    );
};

export default ArchiveNotesContainer;

