import Note from "../Models/notes.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asynHandler.js";

export const createNote = asyncHandler(async (req, res, next)=>{
    console.log(req.body)
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
    try {
        if(!req.user){
            throw new Error(401, "Unathorized Attempt! Please login.")
        }

        const notes = await Note.find({authorId: req.user?._id})
        console.log(notes);

        res
            .status(200)
            .json(
                new apiResponse(200, "notes fetched", notes)
            )
    } catch (error) {
        next(error);
    }
})

export const searchNotesOfUser = asyncHandler(async (req, res, next)=>{
    try {
        if(!req.user){
            throw new apiError(404, "Unathorized Attempt! Please login.")
        }
        const { searchTerm } = req.query;
        if(!searchTerm){
            throw new apiError(404, "No search term.")
        }
        
        const searchResult = await Note.find({
            authorId: req.user?._id,
            $or: [
              { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in title
              { content: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in content
              { category: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in category
            ],
          });
            
        if(searchResult.length === 0){
            res
                .status(404)
                .json(
                    new apiResponse(404, "No result!", [])
                )
        }

        res
            .status(200)
            .json(
                new apiResponse(200, "searched result is here!", searchResult)
            )
    } catch (error) {
        next(error)
    }
})

export const likeNotes = asyncHandler(async (req, res, next)=>{
    try {
        if(!req.user){
            throw new apiError(404, "Unathorized Attempt! Please login.")
        }
        const { noteId } = req.params;
        if(!noteId){
            throw new apiError(404, "noteId is missing")
        }

        let likedNote = await Note.findOne({
            _id: noteId,
            authorId: req.user?._id
        });
        
        if (!likedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        likedNote.favorite = !likedNote.favorite;
        await likedNote.save();
        
        if(!likedNote){
            throw new apiError(500, "failed to make it favorite")
        }

        res.status(200).json(new apiResponse(200, "added to favorite", likedNote));        
        

    } catch (error) {
        next(error)
    }
})

export const getFavNotes = asyncHandler(async (req, res, next) => {
    try {
        if (!req.user) {
            throw new apiError(401, "Unauthorized attempt! Please login.");
        }

        // Await the query result
        const favNotes = await Note.find({ authorId: req.user._id, favorite: true });

        if (favNotes.length === 0) {
            return res.status(200).json(
                new apiResponse(200, "No favorite notes yet", [])
            );
        }

        res.status(200).json(
            new apiResponse(200, "Favorite notes retrieved successfully", favNotes)
        );

        console.log("Favorite Notes:", favNotes);
    } catch (error) {
        next(error);
    }
});
