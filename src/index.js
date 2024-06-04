import dotenv from 'dotenv'
dotenv.config()

import connectDB from "./db/index.js"
import app from './app.js'

//console.log(`${process.env.PORT}`)
const port = process.env.PORT || 3000

connectDB() // async function returns a promise. then() => function to be executed once I am connected to mongodb
.then(()=>{

   /*  app.on("err",(err)=>{
      console.log("Error in starting the server")
    }) */ //code for listening to a special event before starting the server
    
    app.listen( port, ()=>{
      console.log(`Server Successfully listening at port ${port}`)
    })
})
.catch((err)=>{
    console.error("Error in starting the server",err)
})




















//function syntax, to define and then execute immediatly. Semicolon can be avoided, justa practice to avoid the compilation etc errors
/*( async ()=>{

try{
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
}
catch(error){
   console.error("ERROR :",error)
   throw error
}
})() */

