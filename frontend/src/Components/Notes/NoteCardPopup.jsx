import { useState } from "react";
import { BsFullscreen, BsFullscreenExit, BsXCircle } from "react-icons/bs";

export default function NoteCardPopup({ note, setPopup }) {
    console.log("note from popup", note)
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all ${
        isFullscreen ? "z-50" : "z-10"
      }`}
      style={{
        transform: isFullscreen ? "scale(1)" : "scale(0.8)",
        transition: "transform 0.3s ease",
      }}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-4/5  overflow-y-auto ${
          isFullscreen ? "w-full h-full" : ""
        }`}
        style={{
          maxHeight: "80vh",
        }}
      >
        {/* Header with title and fullscreen icon */}
        <div className="flex items-center mb-4 sticky top-0 bg-white z-50 p-2 shadow-md">
            <div className="flex gap-2 justify-between w-full">
                <button
                className="text-gray-500"
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                >
                {isFullscreen ? <BsFullscreenExit size={24} /> : <BsFullscreen size={24} />}
                </button>
                <h2 className="text-xl font-semibold truncate">{note.title}</h2>
                <button
                className="text-red-600"
                onClick={() => setPopup(false)}
                aria-label="exit popup"
                >
                <BsXCircle size={24} />
                </button>
            </div>
            </div>


        {/* Content Section with Vertical Overflow */}
        <div
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </div>
    </div>
  );
}
