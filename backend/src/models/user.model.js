const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Username is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
},{
    timestamps:true
})
const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel