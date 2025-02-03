import { useState, useRef } from "react";
// import axios from "axios";

export default function AudioRecorder({ setAudioURL }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [audioURL, setLocalAudioURL] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setLocalAudioURL(audioUrl); // Store locally for preview

        // Upload audio to Cloudinary
        const audioFile = new FormData();
        audioFile.append("file", audioBlob, "audio.wav");
        audioFile.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Cloudinary preset
        audioFile.append("resource_type", "auto"); // This automatically detects file type
        
        // Iterate and log each entry in FormData
        for (let [key, value] of audioFile.entries()) {
          console.log(key, value);
        }
        
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/cloudname/upload",
            {
                method: "POST",
                body:JSON.stringify({audioURL: audioUrl})
            }
            
          );
          // Get the Cloudinary URL of the uploaded audio
          const data = await response.json();
          console.log(data);
          const cloudinaryAudioUrl = response.data.secure_url;
          setAudioURL(cloudinaryAudioUrl); // Store globally for saving the note
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded-lg text-white ${
            isRecording ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {audioURL && (
          <audio controls>
            <source src={audioURL} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
}
