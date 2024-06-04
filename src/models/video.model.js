import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = mongoose.Schema({
    title :{
        type : String,
        required : true,
        unique : true
    },
    thumbnailImg :{
        type : String,
        required : true
    },
    videoFile :{
        type : String,
        required:true
    },
    description:{
      type : String,
      required : true,
      default:""
    },
    duration : Number,
    isPublished : {
        type:Boolean,
        default:true
    },
    views : {
        type:Number,
        defualt :0
    },
    likes :[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Like",
        default :[]
    }],
    comments :[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default :[]
    }],
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"User"
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate) // helps in writing aggregate queries , will be needed in watch history

export const Video = mongoose.Model('Video',videoSchema)