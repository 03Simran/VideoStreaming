import multer from "multer";
import fs from "fs"

// create a middleware for uploading file to server temporarily

const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null,'./public/temp')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)  // can also change it to have all the files unique names
    }

})

const upload = multer({storage : storage})

export default upload