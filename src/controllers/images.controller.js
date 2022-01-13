import { unlink } from 'fs-extra';
import { resolve } from 'path';
import Image from '../models/Image';

export const getAllImages = async (req,res) => {
    try{
        const images = await Image.find();
        res.json(images)
    }
    catch(error){
        console.log(error);
    }  
}

export const uploadImage = async (req,res) => {
    try {
        const { title,description } = req.body;
        const { filename,originalname,size,mimetype } = req.file;
        const newData = new Image({ title,description,filename,originalname,size,mimetype });
        newData.path = '/img/upload/' + req.file.filename;
        await newData.save();
        res.json({message: 'uploaded'});
    } catch (error) {
        res.json({message: 'error'});
    }
}

export const updateImage =  async (req,res) => {
    try{
        const { id } = req.params;
        const { title,description } = req.body;
        const { filename,originalname,size,mimetype } = req.file;
        let path = `/img/upload/${req.file.filename}`;
        const updateOneImage = await Image.findByIdAndUpdate(id,{ title,description,filename,originalname,size,mimetype,path });
        await unlink(resolve('./src/public/' + updateOneImage.path));
        res.json({message:'updated'});
    }
    catch(error){
        //res.json({message: 'error'})
        console.log(error)
    }
}

export const deleteImage = async (req,res) => {
    try {
        const { id } = req.params;
        const deleteOneImage = await Image.findByIdAndDelete(id);
        await unlink(resolve('./src/public/' + deleteOneImage.path));
        res.json({message:'deleted'});
    } catch (error) {
        res.json({message: 'error'});
    }

}
/* It works */
export const deleteAllImages = async (req,res) => {
    try{
        const getAllImages = await Image.find();
        for (let i = 0; i < getAllImages.length; i++) {
            await unlink(resolve('./src/public/' + getAllImages[i].path));            
        }
        const deleteAll = await Image.deleteMany();
        res.json({message: 'deleted-all'});
    }
    catch(error){
        res.json({message:'error'});
    }
}
