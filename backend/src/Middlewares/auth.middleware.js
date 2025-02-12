import apiError from "../Utils/apiError.js";
import { asyncHandler } from "../Utils/asynHandler.js";
import jwt from "jsonwebtoken"

export const isUserLoggedIn = asyncHandler(async (req, res, next) => {
    try {
        // console.log("control reached here")
        // console.log(req.cookies)
        const { accessToken } = req.cookies;
        if (!accessToken) {
            throw new apiError(401, "Access token is missing, please log in.");
        }

        // Verify the access token
        try {
            const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.user = decodedToken;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new apiError(401, "Access token has expired, please log in again.");
            } else {
                throw new apiError(401, "Invalid access token, please log in again.");
            }
        }
    } catch (error) {
        next(error);
    }
});