import mongoose ,{Schema} from "mongoose"

const likeSchema= Schema({
    video : {
        type :Schema.Types.ObjectId,
        ref :"Video"
    },
    user :{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

likeSchema.methods.unlike = async ()=>{
    
}
export default Like = mongoose.model("Like",likeSchema)