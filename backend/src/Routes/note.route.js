import express from "express";
import { isUserLoggedIn } from "../Middlewares/auth.middleware.js";
import { 
    createNote, 
    getAllNotesOfUser, 
    getFavNotes, 
    getNoteOfUser, 
    likeNotes, 
    searchNotesOfUser } from "../Controllers/notes.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();

router.route("/create-note").post(upload.none(), isUserLoggedIn, createNote);
router.route("/get-note/:noteId").get(upload.none(), isUserLoggedIn, getNoteOfUser);
router.route("/get-notes").get(upload.none(), isUserLoggedIn, getAllNotesOfUser);
router.route("/search-notes").post(upload.none(), isUserLoggedIn, searchNotesOfUser);
router.route("/favorite/:noteId").post(isUserLoggedIn, likeNotes)
router.route("/get-favorite").get(isUserLoggedIn, getFavNotes);

export default router;