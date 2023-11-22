import { createError } from "../error.js";
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"
export const addComments= async(req,res)=>{
    const newComment=new Comment({
        ...req.body,userId:req.user.id
    })
    try{
        const savedComment=await newComment.save();
        res.status(200).json(savedComment);
    }catch(e){
        next(e);
    }
}

export const deleteComments=async (req,res)=>{
    try{
        const comment=await Comment.findById(req.params.id);
        const video=await Video.findById(req.params.id);
        if(req.user.id===comment.userId || req.user.id===video.userID){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("the comment has been deleted");
        }else{
            next(createError(403,"You can delete only your comment"));
        }
    }catch(e){
        next(e)
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (e) {
        next(e); // Pass the error to the next middleware
    }
};