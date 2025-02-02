import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import apiResponse from './Utils/apiResponse.js';

const app = express();

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(cookieParser());

app.use((err, req, res, next)=>{
    res
    .status(err.statusCode||500)
    .json(
        new apiResponse(err.statusCode||400, err.message||"something went wrong", err)
    );
});

export default app;