import express from "express";
import { loginUser, logoutUser, registerUser } from "../Controllers/auth.controller.js";
import { isUserLoggedIn } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();

router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(isUserLoggedIn, logoutUser)

export default router;