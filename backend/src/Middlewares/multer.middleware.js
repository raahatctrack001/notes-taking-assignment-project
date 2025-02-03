import multer from "multer";
import path from 'path';
import fs from 'fs'
const __dirname = path.resolve();

const uploadDir = path.join(__dirname, 'public');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Max file size 10MB (Adjust as needed)
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|gif|mp3|wav|ogg|mp4|avi/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image, audio, and video files are allowed'));
    }
  }
});