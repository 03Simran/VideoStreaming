import mongoose  from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

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
        default:""
    },
    email:{
        type :String, 
        required : true,
        unique:true,
        lowercase : true
    },
    gender :{
        enum:['M','F','O'],
        default : 'M'
    },
    profileImg :{
        type : String,  //cloudinary url
        required : true
    },
    coverImg:{
        type : String 
    },
    uploadedVideos : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video',
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
    }],
    refreshToken:String
},{timestamps:true})

// encryption to be done just before data is saved. We can use Middleware prehooks for the same 
///userSchema.pre("save",()=>{}) // dont write callback this way, as arrow functions in JS are not aware of the current context and we do need it for saving smth.
 
userSchema.pre("save", async function(next){
   if(!this.isModified("password")) return next() //if password modified, then only encrypt 
   this.password = bcrypt.hash(this.password,10) //using this directly will encrypt password everytime user makes some chnages in profile
   next()  
})

userSchema.methods.isPasswordCorrect = async function(password){ //injecting my custom functions in User Model
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccesToken = function(){
    return jwt.sign(
        {
            name : this.name,
            _id : this.id,
            username: this.username,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}   // also injecting methods to gen access and refresh tokens 

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            name : this.name,
            _id : this.id,
            username: this.username,
            email : this.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.Model('User',userSchema)