import User from "../Models/user.model.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asynHandler.js";

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