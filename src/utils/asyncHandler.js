//this can be created in two ways : Promises and try catch block

//1. await-async and try-catch

const asyncHandler = (requestHandler)=>async(req,res,next)=>{
   try{
       await requestHandler(req,res,next)
   }
   catch(err){
    res.code(err.code||500).json({
        success : false,
        message : err.message || "Error in processing the request"
    })
   }

}

// 2. Promise Resolve and Reject 

const asyncHandler2 = (requestHandler)=>{
   (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next))
           .catch((err)=>next(err))
   }
}

//both perform the same function 

export default asyncHandler