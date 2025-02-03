import { useState } from "react";
import AudioRecorder from "./AudioRecorder"; // Assuming this is the AudioRecorder component you created.
import { useDispatch } from "react-redux";
import { addNote } from "../../redux/features/notes.slice";

export default function CreateNote({setNotes}) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal"); // Default category

  const handleContentChange = (event) => {
    setNoteContent(event.target.innerHTML)
    
  };

  console.log(noteContent)
  const handleToggleBold = () => {
    document.execCommand("bold");
  };

  const handleToggleItalic = () => {
    document.execCommand("italic");
  };

  const handleToggleHighlight = () => {
    document.execCommand("backColor", false, "yellow");
  };

  const handleSubmitNote = async () => {
    const formData = new FormData();
    
    // Add content, title, category to FormData
    formData.append("content", noteContent);
    formData.append("title", title);
    formData.append("category", category);
    // Add audio file to FormData if it exists
    if (audioURL) {
      const audioFile = await fetch(audioURL)
      .then((response) => response.blob())
      .then((blob) => new File([blob], "audio-file.mp3", { type: "audio/mp3" }));
      
      formData.append("audio", audioFile);
    }
    formData.forEach(data=>console.log(data));

    // Send form data to the backend
    try {
      const response = await fetch("/api/v1/notes/create-note", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Note submitted:", result);
      if(result.success){
        dispatch(addNote(result.data))
        setNotes((prevNotes) => [...prevNotes, result.data]);

      }
      
      setShowModal(false);

    } catch (error) {
      console.error("Error submitting note:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        onClick={() => setShowModal(true)}
      >
        Create New Note
      </button>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Create Note</h2>

            {/* Title and Category */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                className="border p-2 w-full mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                className="border p-2 w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Ideas">Ideas</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Text Editor */}
            <div className="mb-4 overflow-y-scroll max-h-96">
              <div className="flex gap-4 mb-2">
                <button onClick={handleToggleBold} className="font-bold">B</button>
                <button onClick={handleToggleItalic} className="italic">I</button>
                <button onClick={handleToggleHighlight} className="bg-yellow-400">Highlight</button>
              </div>
              <div
                contentEditable
                className="border p-2 w-full min-h-[150px] mb-4 overflow-scroll"
                onInput={handleContentChange}
                // dangerouslySetInnerHTML={{ __html: noteContent }}
                
              />
              {/* {noteContent} */}
            </div>

            {/* Audio Recorder */}
            <AudioRecorder setAudioURL={setAudioURL} />

            {/* Buttons to submit or cancel */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmitNote}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

