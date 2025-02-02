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

})

export const getAllNotesOfUser = asyncHandler(async (req, res, next)=>{

})

export const searchNotesOfUser = asyncHandler(async (req, res, next)=>{

})
