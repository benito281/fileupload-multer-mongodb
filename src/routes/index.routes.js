import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { getAllImages,uploadImage,updateImage,deleteImage,deleteAllImages } from '../controllers/images.controller';
const router = Router();

/* File name and storage configuration */
const storedFile = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/upload'),
    filename: (req,file,cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

//Configuration of filters, limits and storage
const upload = multer({
    storage:storedFile,
    limits: {
        fileSize: 8000000               // Se agrega el limite del archivo
    },
    fileFilter: (req,file,cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
           return cb(null, true);
        }
        cb('Error: The file should be an image');
    }
}).single('image');


/* Get all images */
router.get('/images', getAllImages);

/* Upload image */
router.post('/upload-image', upload, uploadImage);

/* Update image */
router.put('/image/:id/update',upload, updateImage)

/* Delete image */
router.delete('/image/:id/delete', deleteImage);

/* Delete all image */
router.delete('/delete-all',deleteAllImages)


export default router;