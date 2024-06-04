// we want to make a custom class for api responses to standardise it 

class ApiResponse{
    constructor(statusCode,data, message="Success"){
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success=statusCode<400
    }
}

export {ApiResponse}