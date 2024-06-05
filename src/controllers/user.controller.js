import User from '../models/user.model.js'
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const registerUser = asyncHandler(  //
    async (req,res)=>{
 
        const {username,password,name,email,gender} = req.body  //data handling , for file handling we need to use the middleware from multer 

        if(!email|| !username || !password ){
            return res.send("username empty")
            
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


const loginUser = asyncHandler(async(req,res)=>{
    //take username and password
    // validations: empty not empty 
    //check if user exists 
    //check for password 
    //generate access and refresh token
    //send these tokens in cookies 


    const{username,email,password}=req.body
    
    if(!username && !email){
        res.send(400)
        throw new ApiError(400,"Either username or email required")
    }

    if(!password){
        res.send(400)
        throw new ApiError(400,"Password cant be empty")
    }

    const existingUser = (await User.findOne({
            $or : [{username},{email}]
        }))

    if(!existingUser){
        res.send(404)
        throw new ApiError(404,"User doesn't exist,register first")
    }

    const passwordCorrect = await existingUser.isPasswordCorrect(password)

    if(passwordCorrect){
        //authentic user 
        const accessToken = await existingUser.generateAccesToken()
        const refreshTokn = await existingUser.generateRefreshToken()

        existingUser.refreshToken  = refreshTokn
        await existingUser.save({validateBeforeSave:false})  //.save() method to save in database 

        const { password, refreshToken, ...userWithoutSensitiveInfo } = existingUser.toObject();  //instead of making another db call, just modify the existing User
 
        const options ={
            httpOnly : true,
            secure: true
        }

        res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken", refreshToken,options)
        .json(
            new ApiResponse(200,{userWithoutSensitiveInfo,
                accessToken,refreshTokn
            },"Logged in Successfully")
        )
    }  
})


const logoutUser = asyncHandler(
    async(req,res)=>{  // we need to find the user from the accesstoken from cookies or request headers // use middleware
         //clear cookies and find user from db and remove refresh token

         const currUser = await User.findByIdAndUpdate(
            req.user._id,
            {
              $set :{
                refreshToken :""
              }
            },
           {
              new : true
           }
        )

        const options ={
            httpOnly : true,
            secure: true
        } 

        res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(
            new ApiResponse(200,{},"Logged Out Successfully")
        )


         

    }
)


export { loginUser, registerUser,logoutUser }
