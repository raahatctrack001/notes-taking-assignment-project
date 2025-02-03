import { useEffect, useState } from "react";
import { BsSearch, BsSortAlphaUpAlt } from "react-icons/bs";
import NoteCardPopup from "./NoteCardPopup";


export default function NotesHeader({setNotes}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [note, setNote] = useState({});
  // const dispatch = useDispatch();
  
  
  function handleSearchedNoteClick(note){
    console.log("notes from search", note)
    setPopup(true), setNote(note)
  }
  useEffect(() => {
    if (searchTerm === "") {
      setSearchedNotes([]); // Clear results if searchTerm is empty
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true); // Show loading state
      (async () => {
        const response = await fetch(`/api/v1/notes/search-notes?searchTerm=${searchTerm}`, {
          method: "POST",
        });
        const data = await response.json();

        if (data.success) {
          setSearchedNotes(data.data);
          console.log(data.data)
          // setNotes(data.data);
        }

        setLoading(false); // Hide loading state after the search completes
      })();
    }, 2000); // 2 seconds debounce

    return () => clearTimeout(delayDebounce); // Cleanup function to prevent multiple triggers
  }, [searchTerm]);

  return (
    <div className="relative mx-5 mt-2">
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Search notes..."
            className="bg-gray-100 border-2 w-full pl-10 rounded-xl h-12 flex justify-start items-center"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
        {popup && <NoteCardPopup note={note} setPopup={setPopup} />}
        <button 
              className="border-2 rounded-xl flex gap-1 h-10 justify-center items-center px-2"
              onClick={() => {
                setNotes(prev => 
                  [...prev].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                );
              }}
            >
              <BsSortAlphaUpAlt />
              Sort
          </button>
      </div>

      {/* Display loading indicator or search results */}
      {loading && searchTerm && (
        <div className="absolute bg-white w-full mt-2 p-2 rounded-xl shadow-md text-gray-500">
          <p>Searching...</p>
        </div>
      )}

      {/* Display search results */}
      {searchTerm && !loading && searchedNotes.length > 0 && (
        <div className="absolute bg-white w-full mt-2 p-2 rounded-xl shadow-md max-h-60 overflow-y-auto text-gray-700">
          {searchedNotes.map((note) => (
            <div key={note.id} className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={()=>{{setPopup(true), setNote(note)}}}
              >
              <p>{note.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* Display message when no results are found */}
      {searchTerm && !loading && searchedNotes.length === 0 && (
        <div className="absolute bg-white w-full mt-2 p-2 rounded-xl shadow-md text-gray-500">
          <p>No results found.</p>
        </div>
      )}
    </div>
  );
}
