import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app= express()

app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use(express.json({
    limit:'16kb',
}))

app.use(express.urlencoded({
    extended: true,
    limit : '16kb'
}))

app.use(express.static({
   root: "public"
}))

app.use(cookieParser()) //access and set cookies from client's browser : will get to know     




export default app