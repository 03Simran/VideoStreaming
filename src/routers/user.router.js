import { Router } from "express";
import {registerUser,loginUser,logoutUser,refreshAccessToken} from "../controllers/user.controller.js";
import upload from '../middlewares/multer.js'
import { verifyUser } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.route('/register').post(
    upload.fields([    //middleware for file handling
        {
            name :"profilePhoto",
            maxCount :1
        },
        {
            name :"coverPhoto",
            maxCount :1
        },

    ]),
    registerUser)

userRouter.route('/login').post(loginUser)

userRouter.route('/logout').post(verifyUser,logoutUser)

userRouter.route('/refreshtoken').post(refreshAccessToken)

export default userRouter