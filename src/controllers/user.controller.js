import User from '../models/user.model.js'
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const registerUser = asyncHandler(  //
    async (req,res)=>{
 
        const {username,password,name,email,gender} = req.body  //data handling , for file handling we need to use the middleware from multer 

        if(!email|| !username || !password ){
            res.status(400) 
            throw new ApiError(400,"Username, Email and Password can't be empty")
        }

        const existingUser = (await User.findOne({
            $or : [{username},{email}]
        }))
        
        if(existingUser) {
           res.status(409)
           throw new ApiError(409,"User already exists")
        }
        
        console.log(req.files)

        let profileLocalPath
        if(req.files?.profilePhoto){
            profileLocalPath = req.files?.profilePhoto[0]?.path  //? : because we dont know if we might get or not
        }
       
        let coverLocalPath 
        if(req.files?.coverPhoto){
            coverLocalPath= req.files?.coverPhoto[0]?.path 
        }

        if(!profileLocalPath) {
           res.status(400)
           throw new ApiError(400,"Profile Photo is required")
        }
        
        let coverImg
        const profileImg = await uploadOnCloudinary(profileLocalPath)
        if(coverLocalPath) {coverImg = await uploadOnCloudinary(coverLocalPath)}

        console.log("PROFILEURL:",profileImg)

        if(!profileImg){
           res.status(500)
        }
  
        const newUser = await User.create({
            username : username.toLowerCase(),
            password,
            name,
            email,
            gender,
            profileImg : profileImg.url,
            coverImg : coverImg?.url || ""
        })



        const createdUser = await User.findById(newUser._id).select(
            "-password -refreshToken"
        )

        if(!createdUser){
            res.status(500)
            throw new ApiError(500,"Server Side Error in creating the user")
        }


        // res.sendStatus sends the code and closes the request. so to send json as well, we should use res.status
        res.status(200).json(  
            new ApiResponse(
                200,
                createdUser,
                "User registered successfully")
        )
      
        // take from req.body :  username,email,password,name,gender, profileIng,CoverImg
        //validations : not empty, format correct,
        // check if no one else registered from same email and username
        // get the images and get the localPath
        // check if we get localPath else send no file received
        // upload on Cloudinary , check if got uploaded and we get the response
        // create User Object
        // save the data to Users
        //send 200 and
        //send response to user - pw and refresh tokens
        //ACCESS TOKEN WHAT?
        
     }
)

export default registerUser