import { useState } from "react";
import { BsFillPlayCircleFill, BsFonts, BsHeartFill, BsTrash } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { format } from "date-fns";

const NoteCard = ({ note, setNotes }) => {
  const { title, content, updatedAt, duration } = note;
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${title}\n\n${content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleFavClick(e){
    e.stopPropagation();
    try {
      const response = await fetch(`/api/v1/notes/favorite/${note?._id}`, {method: "POST"})  
      const data = await response.json();

      if(data.success){
        setNotes(prev =>
          prev.map(note => 
              note._id === data.data._id ? data.data : note
          )
      );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteNode(e){
    e.stopPropagation();
    const response = await fetch(`/api/v1/notes/delete-note/${note?._id}`, {method: "DELETE"});
    const data = await response.json();

    if(data.success){
      setNotes(prev=>prev.filter(item=>item._id != note?._id))
      console.log("deleted Note", data);
    }
    
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-md h-40 flex flex-col justify-between">
      {/* Top Section: Date/Time & Note Type */}
      <div>
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <span>{format(new Date(updatedAt), "PPpp")}</span>
          <div className="flex items-center gap-1">
            {note.audioURL ? (
              <>
                <BsFillPlayCircleFill className="text-blue-500 text-lg" />
                <span>{duration}</span>
              </>
            ) : (
              <span className="text-gray-600 flex items-center bg-gray-100 rounded-xl px-1">
                <BsFonts /> Text
              </span>
            )}
          </div>
        </div>

        {/* Note Content */}
        <div className="mt-2">
          <h2 className="font-semibold text-lg text-gray-800 truncate w-full max-w-[90%]">
            {title}
          </h2>
          <p className="text-gray-600 mt-1 text-sm line-clamp-2 overflow-hidden">
            {content}
          </p>
        </div>
      </div>

      {/* Bottom Section: Copy & Options */}
      <div className="flex justify-end items-center mt-3 space-x-4">
        <button className="text-gray-500 hover:text-gray-700" title="favorite" onClick={(e)=>handleFavClick(e)}>
        <BsHeartFill className={`text-xl  ${note.favorite ? 'text-red-500' : 'text-gray-500'}`} />
        </button>
        <button onClick={(e) => handleCopy(e)} className="text-gray-500 hover:text-blue-500" title="copy">
          {copied ? "Copied!" : <FiCopy className="text-xl" />}
        </button>
        <button className="text-gray-500 hover:text-gray-700" title="option" onClick={(e)=>handleDeleteNode(e)}>
          <BsTrash className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
