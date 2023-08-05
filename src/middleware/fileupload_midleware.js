import multer from 'multer';
import path from 'path';
const __dirname = path.resolve();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadFolderPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + file.originalname);
//     },
// });

export const upload = multer({storage: storage});