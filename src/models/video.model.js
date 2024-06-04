import mongoose from 'mongoose'

const videoSchema = mongoose.Schema({
    title :{
        type : String,
        required : true,
        unique : true
    },
    thumbnailImg :{
        type : String
    },
    video :{
        type : String
    },
    description:{
      type : String,
      required : true
    },
    duration :{
        type : Number
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"User"
    },
    views : Number,
    likes :[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }],
    comments :[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],


})