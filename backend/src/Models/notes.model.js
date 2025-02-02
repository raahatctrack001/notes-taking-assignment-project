import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String 
    },
    audioUrl: { 
        type: String 
    }, // URL to store the audio file
    category: { 
        type: String, 
        enum: ["Personal", "Work", "Ideas", "Others"], 
        default: "Others" 
    },
    isPinned: {
        type: Boolean, 
        default: false 
    }
}, {timestamps: true});

NoteSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Note", NoteSchema);
