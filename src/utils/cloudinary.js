import {v2 as cloudinary} from 'cloudinary';
import { log } from 'console';
import fs from 'fs'; // nodejs file handling system, default. 

cloudinary.config({ 
  cloud_name: 'di6k7qitz', 
  api_key: '252386474775493', 
  api_secret: 'E2FGQYp166NUNRRCe2Jl9cMHLAg' 
});
          
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

const uploadOnCloudinary = async(localFilePath)=>{ //localfilepath multer will give as a middleware
   try{
     if(!localFilePath){
        console.log("File path not found")
        return null
     }

     const response =  await cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
     })
     
     //console.log("File uploaded Successfully") 

     fs.unlink(localFilePath,()=>{
     // console.log("Uploaded and Unlinked")
     })
     return response   

   }
   catch(error){
     console.log(error)
     fs.unlink(localFilePath,()=>{
      console.log("Failed to upload and Unlinked")
     })
     return null
   }
}

export default uploadOnCloudinary