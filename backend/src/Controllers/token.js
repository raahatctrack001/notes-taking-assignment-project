import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const currentUser = await User.findById(userId).select("+password");

        if (!currentUser) {
            throw new apiError(404, "User not found");
        }

        const accessToken = await currentUser.generateAccessToken();
        const refreshToken = await currentUser.generateRefreshToken();

        currentUser.refreshToken = refreshToken;
        await currentUser.save();

        console.log('Tokens generated successfully!');
        return {accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, error.message);
    }
}

const isProduction = process.env.NODE_ENV === 'production';

export const options = {
    httpOnly: true,
    secure: isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
};