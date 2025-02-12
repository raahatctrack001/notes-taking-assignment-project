import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import apiResponse from './Utils/apiResponse.js';
import authRouter from './Routes/auth.route.js';
import notesRouter from './Routes/note.route.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: './.env'})
const app = express();

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", notesRouter)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });

app.use((err, req, res, next)=>{
    res
    .status(err.statusCode||500)
    .json(
        new apiResponse(err.statusCode||400, err.message||"something went wrong", err)
    );
});

export default app;