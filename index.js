import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import videoRoute from "./routes/video.js"
import commentRoute from "./routes/comment.js"
import cookieParser from "cookie-parser";
const app=express();

dotenv.config();

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URl);
         console.log("database connected");
    }catch(e){
        console.error(e);
    }
}

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/videos",videoRoute)
app.use("/api/comments",commentRoute)

app.use((err,req,res,next)=>{
    const status=err.status||500;
    const message=err.message||"Something went wrong";
    return res.status(status).json({
        success:false,
        status:status,
        message:message
    });
    
})
app.listen(8800,()=>{
    connect();
    console.log("Server has started")
})