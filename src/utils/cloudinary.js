import {v2 as cloudinary} from 'cloudinary';
import { log } from 'console';
import fs from 'fs'; // nodejs file handling system, default. 
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath)=>{ //localfilepath multer will give as a middleware
   try{
     if(!localFilePath){
        console.log("File path not found")
        return null
     }

     const response =  await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
     })

     console.log("File uploaded Successfully")    //needs to be improved I guess 
   }
   catch(error){
     console.log(error)
     fs.unlink(localFilePath)
   }
}

export {uploadOnCloudinary}