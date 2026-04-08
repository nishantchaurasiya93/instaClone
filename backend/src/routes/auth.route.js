const express=require("express")
const router=express.Router()
const{loginUserController,registerUserController,logOutUserController}=require("../controllers/auth.controller")
router.post("/register",registerUserController)
router.post("/login",loginUserController)
router.post("/logout",logOutUserController)
module.exports=router