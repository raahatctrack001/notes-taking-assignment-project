import Note from "../Models/notes.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asynHandler.js";

export const createNote = asyncHandler(async (req, res, next)=>{
    try {
        if(!req.user){
            throw new apiError(401, "Please login to create notes!")
        }

        const { title, content, audioURL, category, isPinned } = req.body;
        if(!title){
            throw new apiError(400, "Title of the notes is missing!")
        }

        if(!content){
            throw new apiError(400, "Content for this notes is missing!")
        }

        const newNote = await Note.create({
                            authorId: req.user?._id,
                            title,
                            content,
                            audioURL,
                            category,
                            isPinned,
                        })

        if(!newNote){
            throw new apiError(500, "failed to create note!")
        }
        console.log(newNote)

        res
            .status(201)
            .json(
                new apiResponse(201, "Notes added successfully!!", newNote)
            )

    } catch (error) {
        next(error);
    }
})

export const getNoteOfUser = asyncHandler(async (req, res, next)=>{
    try {
        if(!req.user){
            throw new apiError(401, "Unathorized attempt! please login first.")
        }

        const { noteId } = req.params;
        if(!noteId){
            throw new apiError(400, "NoteId is missing!")
        }

        const currentNote = await Note.findById(noteId);
        if(!currentNote){
            throw new apiError(404, "Note doesn't exist!")
        }

        if(currentNote.authorId != req.user?._id){
            throw new apiError(401, "You can't access the notes of other person!")
        }
        res
            .status(200)
            .json(
                new apiResponse(200, "Notes found!", currentNote)
            )

    } catch (error) {
        next(error)
    }
})

export const getAllNotesOfUser = asyncHandler(async (req, res, next)=>{

})

export const searchNotesOfUser = asyncHandler(async (req, res, next)=>{

})
