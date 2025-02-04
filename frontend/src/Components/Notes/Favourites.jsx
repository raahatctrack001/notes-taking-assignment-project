import { useEffect, useState } from "react"
import NoteCard from "./NoteCard";
import NoteCardPopup from "./NoteCardPopup";

export default function Favourites(){
    const [notesData, setNotesData] = useState([]);
    const [popup, setPopup] = useState(false);
    const [popupNote, setPopupNote] = useState({});
    console.log("favorite is here bro")
    useEffect(()=>{ 
        (async()=>{
            const response = await fetch("api/v1/notes/get-favorite");
            const data = await response.json();

            if(data.success){
                setNotesData(data.data);
                console.log("data from favorites", data);
            }
        })();
    }, [])

    function handleNoteClick(note){
        console.log(note)
        setPopup(true), 
        setPopupNote(note)
      }
  
    return <div>
      <div className="grid grid-cols-4 gap-1 mt-5 border-2 p-2 rounded-xl flex-grow">
        {popup && <NoteCardPopup note={popupNote} setPopup={setPopup} />}
          {notesData.map((note, index)=>{
            return <div key={index} onClick={()=>handleNoteClick(note)}  className="cursor-pointer">
              <NoteCard note={note} setNotes={setNotesData} />
              </div>
          })}
        </div>
    </div>
}