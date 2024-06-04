import { Router } from "express";
import registerUser from "../controllers/user.controller.js";
import upload from '../middlewares/multer.js'

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

export default userRouter