import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String 
    },
    audioURL:{
        type: String 
    }, // URL to store the audio file
    category: { 
        type: String, 
        enum: ["Personal", "Work", "Ideas", "Others"], 
        default: "Others" 
    },
    favorite:{
        type: Boolean,
        default: false,
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

const Note = new mongoose.model("Note", NoteSchema);
export default Note;