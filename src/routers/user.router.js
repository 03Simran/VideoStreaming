import { Router } from "express";
import {registerUser,loginUser,logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateFiles
     } from "../controllers/user.controller.js";
import upload from '../middlewares/multer.middleware.js'
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

userRouter.route('/changePassword').post(verifyUser,changeCurrentPassword)

userRouter.route('/getUser').get(verifyUser,getCurrentUser)

userRouter.route('/updateAccount').put(verifyUser,updateAccountDetails)

userRouter.route('/updateFile').put(verifyUser,upload.fields([    //middleware for file handling in updateAccount
    {
        name :"profilePhoto",
        maxCount :1
    },
    {
        name :"coverPhoto",
        maxCount :1
    },

]),
updateFiles)

export default userRouter