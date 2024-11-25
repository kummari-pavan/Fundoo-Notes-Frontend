import React,{useState,useEffect} from 'react';
import {fetchNotes} from '../../utils/Api';
import EmptyNotes from './EmptyNotes';
import NoteCard from './NoteCard'
import './Notes.scss'

const Notes =()=>{
    const[notesData,setNotesData]=useState([])

    
    useEffect(()=>{
        const fetchingNotes=async ()=>{
            try{
                const notes = await fetchNotes();
                console.log(notes.data);
                setNotesData(notes.data)
            }
            catch(err){
                console.error("Error:",err);

            };

        }
        fetchingNotes();
    },[]);

    return(
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
    )
}

export default Notes;