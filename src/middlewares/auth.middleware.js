import User from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

const verifyUser = asyncHandler(
    (req,_,next)=>{  //res not used : can be replaced by _

          // console.log(req.cookies)
            const token = req.cookies?.accessToken || req.headers.Authorization?.replace("Bearer ","")

        if(!token) {
            throw new ApiError(404,"Unauthorised request")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )

        if(!user){
            throw new ApiError(400,"Invalid/Expired Access Token")
        }

        req._id = decodedToken._id
        next()
    
    }
)

export {verifyUser}