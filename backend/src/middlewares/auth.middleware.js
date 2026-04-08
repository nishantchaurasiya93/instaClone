const jwt=require("jsonwebtoken")
const authMiddleware=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            message:"Login required"
        })
    }
    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({
            message:"Invalid token or expired token"
        })
    }
}
module.exports=authMiddleware