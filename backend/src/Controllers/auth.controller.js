import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asynHandler.js";
import { generateAccessAndRefreshToken, options } from "./token.js";
import bcryptjs from "bcryptjs"

export const registerUser = asyncHandler(async (req, res, next)=>{
    //extract data from body
    
    const {username, email, password, repeatPassword, fullName} = req.body;
    if(password !== repeatPassword){
        throw new apiError (404, "Password and confirm password should be same!")
    }
    //create array for validating the authenticity of received data.
    const userData = [username, email, password, repeatPassword, fullName];
    
    try {
        if(userData.some(field=>field?.trim()?0:1)){
            throw new apiError(404, "All fields are necessary!");
        }
        
        
        //creating new user
        User
            .create(req.body)
            .then((newUser)=>{
                if(!newUser){
                    throw new apiError(401, "failed to register user");
                }
                console.log(newUser);
                const {password, refreshToken, resetPasswordToken, ...data} = newUser._doc;
                res
                    .status(201)
                    .json(
                        new apiResponse(201, `welcome ${newUser.fullName}!!! Now you can keep your notes safely here.`, data)
                    )
                })
            .catch(error=>next(error))

    } catch (error) {
        console.log(error)
        next(error)
    }
})

export const loginUser = asyncHandler(async (req, res, next) => {    
    const { email, password: pass} = req.body;
    console.log(req.body)

    try {
        const user = await User.findOne({email}).select("+password");
        if(!user){
            throw new apiError(404, "user doesn't exist")
        }
        
        if (user) {
            if (!bcryptjs.compareSync(pass, user?.password)) {
                throw new apiError(403, "Password didn't match!");
            }
            
            const tokens = await generateAccessAndRefreshToken(user._id);
            if(!tokens){
                throw new apiError(404, "failed to generate access and referesh token");
            }

            const { password, ...userData} = user?._doc;
            res
                .status(202)
                .cookie('accessToken', tokens.accessToken, options)
                .cookie('refreshToken', tokens.refreshToken, options)
                .json(new apiResponse(202, "User logged in", userData));
        } else {
            throw new apiError(404, "User not found!");
        }
    } catch (error) {
        // console.log(error);
        next(error);
    }
});