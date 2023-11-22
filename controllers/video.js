import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js"
export const addVideo= async (req,res,next)=>{
    const newVideo= new Video(
        {userID:req.user.id,...req.body}
    )
    try{
        const savedVideo= await newVideo.save();
        res.status(200).json(savedVideo);
    }catch(e){
        next(e);
    }
}
export const updateVideo= async (req,res,next)=>{
    try{
        const video= await Video.findById(req.params.id);
        if(!video){
            return next(createError("404","video Not found"));
        }
        if(req.user.id===video.userID){
            const updatedVideo=await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true
            });
            res.status(200).json(updateVideo);
        }else{
            return next(createError("403","you can update only your video"));
        }
    }catch(e){
        next(e);
    }
}
export const deleteVideo= async (req,res,next)=>{
    try{
        const video =await Video.findById(req.params.id);
        if(!video){
            return next(createError("404","Video Not Found"));
        }
        if(video.userID===req.user.id){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("Video deleted successfully")
        }else{
            return next(createError("403","You can delete only your account"));
        }
    }catch(e){
        next(e);
    }
    
}
export const getVideo= async (req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        res.status(200).json(video)

    }catch(e){
        next(e);
    }
}
export const addView= async (req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        });
        res.status(200).json("views has been increased");
    }catch(e){
        next(e);
    }
}
export const random= async (req,res,next)=>{
    try{
        const videos=await Video.aggregate([{$sample:{size:40}}]);
        res.status(200).json(videos)

    }catch(e){
        next(e);
    }
}
export const trend= async (req,res,next)=>{
    try{
        const videos=await Video.find().sort({views:-1});
        res.status(200).json(videos)

    }catch(e){
        next(e);
    }
}
export const sub= async (req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        const subscribedChannels=user.subscribedUsers;

        const list=await Promise.all(
            subscribedChannels.map(channelId=>{
                return Video.find({userID:channelId});
            })
        )
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt));
    }catch(e){
        next(e);
    }
}
export const getByTag= async (req,res,next)=>{
    const tags =req.query.tags.split(",")
    console.log(tags)
    try{
        const videos =await Video.find({tags:{$in:tags}}).limit(20);
        res.status(200).json(videos);
    }catch(e){
        next(e);
    }
}
export const search= async (req,res,next)=>{
    const query=req.query.q
    try{
        const videos=await Video.find({title:{$regex:query , $options:"i"}})
        res.status(200).json(videos);
    }catch(e){
        next(e);
    }
}