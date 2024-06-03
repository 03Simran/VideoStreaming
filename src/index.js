import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./db/index.js"

connectDB()





















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

