import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import User from './src/models/user.model.js'

const registerUser = asyncHandler(  //
    async (req,res)=>{
 
        const {username,password,name,email,gender} = req.body  //data handling , for file handling we need to use the middleware from multer 

        if(email.empty() || username.empty() || password.empty() ){
            throw ApiError(400,"Username, Email and Password can't be empty")
        }

        const existingUser = (User.findOne({
            $or : [{username},{email}]
        }))
        
        if(existingUser) {
            throw ApiError(409,"User already exists")
        }

        const profileLocalPath = req.files?.profilePhoto[0]?.path  //? : because we dont know if we might get or not
        const coverLocalPath = req.files?.coverPhoto[0]?.path 

        if(!profileLocalPath) {
            throw ApiError(400,"Profile Photo is required")
        }

        const profileImg = await uploadOnCloudinary(profileLocalPath)
        if(coverLocalPath) {const coverImg = await uploadOnCloudinary(coverLocalPath)}

        if(!profileImg){
            throw ApiError(500,"Issue in uploading file to the Server")
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



        createdUser = User.findById(newUser._id).select(
            "-password -refreshToken"
        )

        if(!createdUser){
            throw ApiError(500,"Server Side Error in creating the user")
        }

        return res.sendStatus(200).json(
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