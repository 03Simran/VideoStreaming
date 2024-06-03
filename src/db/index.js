import mongoose from 'mongoose'

import { DB_Name } from '../constants.js'

const connectDB = async()=>{
   try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
    console.log(`MongoDB Connected Successfullyy!! , DB Host : ${connectionInstance.connection.host}`)
   }
   catch(err){
     console.error("Error in Connecting with MongoDB :", err)
      process.exit(1) // 
   }
}

export default connectDB