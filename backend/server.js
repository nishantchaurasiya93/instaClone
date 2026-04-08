require("dotenv").config()
const app=require("./src/app")
const connectDb=require("./src/config/db")
const PORT=3000
connectDb()
app.listen(PORT,()=>{
    console.log(`Server started at port:${PORT}`);
})