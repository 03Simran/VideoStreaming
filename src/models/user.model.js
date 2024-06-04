import mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    username :{
        type :String,
        required : true,
        unique:true
    },
    name :{
        type :String,
        required :true
    },
    email:{
        type :String,
        required : true,
        unique:true
    },
    gender :{
        enum:['M','F','O']
    },
    profileImg :{
        type : String 
    },
    coverImg:{
        type : String 
    },
    uploadedVideos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video'
    }],
    watchHistory :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video'
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
    }]
},{timestamps:true})

export const User = mongoose.Model('User',userSchema)