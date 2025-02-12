import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        trim: true, 
        required: true,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false,
    },
    profilePic: [{
        type: String, 
        trim: true,
        default: "https://cdn4.sharechat.com/img_964705_8720d06_1675620962136_sc.jpg?tenant=sc&referrer=tag-service&f=136_sc.jpg"
    }],
    refreshToken: {
        type: String,
        default: "",
        select: false,
    },
}, {timestamps: true})


userSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcryptjs.hashSync(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = function(password){
    return bcryptjs.compareSync(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullName: this.fullName,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        })
}


const User = new mongoose.model("User", userSchema);
export default User;