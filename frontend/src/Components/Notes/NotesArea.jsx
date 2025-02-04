import { useEffect, useState } from "react";
import CreateNote from "./CreateNote";
import NoteCard from "./NoteCard";
import NotesHeader from "./NotesHeader";
import { useDispatch } from "react-redux";
import { addNote } from "../../redux/features/notes.slice";
import NoteCardPopup from "./NoteCardPopup";

export default function NotesArea() {
    const dispatch = useDispatch();
    const [notesData, setNotesData] = useState([]);
    const [popup, setPopup] = useState(false);
    const[popupNote, setPopupNote] = useState({});//note to show at popup
    
    function handleNoteClick(note){
      console.log(note)
      setPopup(true), 
      setPopupNote(note)
    }

    useEffect(()=>{
        (async () => {
          const response = await fetch("/api/v1/notes/get-notes", {
            method: "GET",
      });
    
          const data = await response.json();
          if (data.success) {
            setNotesData(data.data);
            dispatch(addNote(data.data))
          }
        })();        
    }, [])
  
    if (notesData?.length === 0) {
      return (
        <div className="min-h-screen w-full grid place-items-center">
          You do not have any notes yet!. Create new notes
          <div className="w-full">
            <CreateNote notes={notesData} setNotes={setNotesData} />

          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full flex flex-col min-h-screen">
        {popup && <NoteCardPopup note={popupNote} setPopup={setPopup} />}
        {/* Notes Header */}
        <div>
          <NotesHeader setNotes={setNotesData} />
          

        </div>
  
        {/* Notes Grid - Takes Available Space */}
        <div className="grid grid-cols-4 gap-1 mt-5 border-2 p-2 rounded-xl flex-grow">
          {notesData.map((note, index)=>{
            return <div key={index} onClick={()=>handleNoteClick(note)}  className="cursor-pointer">
              <NoteCard note={note} setNotes={setNotesData} />
              </div>
          })}
        </div>
  
        {/* Sticky CreateNote at Bottom */}
        <div className="sticky bottom-0 bg-white p-3 shadow-lg border-t-2 rounded-lg">
          <CreateNote notes={notesData} setNotes={setNotesData} />
        </div>
      </div>
    );
  }
