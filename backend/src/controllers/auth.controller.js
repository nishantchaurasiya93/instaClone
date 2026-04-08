const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerUserController = async (req, res) => {
    try {
        const { email, userName, password, bio, imageUrl } = req.body
        if (!email || !userName || !password) {
            return res.status(400).json({
                message: !email ? "Email is required" : !userName ? "Username is required" : "Password is required"
            })
        }
        const userExist = await UserModel.findOne({
            $or: [
                { email },
                { userName }
            ]
        })
        if (userExist) {
            return res.status(409).json({
                message: "User already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await UserModel.create({
            userName,
            password: hashedPassword,
            email,
            bio,
            imageUrl
        })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.cookie("token", token)
        res.status(201).json({
            message: "Register successfully",
            user:{
                id:user._id,
                userName:user.userName,
                email:user.email,
                bio:user.bio,
                imageUrl:user.imageUrl
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
const loginUserController = async (req, res) => {
    try {
        const{email,userName,password}=req.body
        if(!email && !userName){
            return res.status(400).json({
                message:"Provide either email or username"
            })
        }
        if(email && userName){
            return res.status(400).json({
               message:"Provide either email or username, not both"
            })
        }
        if(!password){
            return res.status(400).json({
                message:"Password is required"
            })
        }
        const user=await UserModel.findOne({
            $or:[
                {email},
                {userName}
            ]
        })
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Invalid password"
            })
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token)
        res.status(200).json({
            message:"Login successfully",
             user:{
                id:user._id,
                userName:user.userName,
                email:user.email,
                bio:user.bio,
                imageUrl:user.imageUrl
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
const logOutUserController=async(req,res)=>{
    try{
        res.clearCookie("token")
        res.status(200).json({
            message:"Logout successfully"
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
module.exports={registerUserController,loginUserController,logOutUserController}