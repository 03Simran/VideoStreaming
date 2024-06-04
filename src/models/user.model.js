import mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    username :{
        type :String,
        required : true,
        unique:true,
        lowercase : true,
        index:true  //to optimise the search 
    },
    password :{
        type : String,
        required : true,
        minlength :[8,"Password is too short"]
    },
    name :{
        type :String,
        required :true
    },
    email:{
        type :String, 
        required : true,
        unique:true,
        lowercase : true
    },
    gender :{
        enum:['M','F','O']
    },
    profileImg :{
        type : String  //cloudinary url
    },
    coverImg:{
        type : String 
    },
    uploadedVideos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video',
        default:[]
    }],
    watchHistory :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video',
        default :[]
    }],
    likes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }],
    subscriptions:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    subscribers:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    playlists :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Playlist'
    }],
    downloads :[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Download'
    }],
    searchHistory :[{
       type: String
    }],
    tweets :[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Tweet'
    }],
    refreshToken:String
},{timestamps:true})

export const User = mongoose.Model('User',userSchema)