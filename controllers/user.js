import { createError } from "../error.js";
import User from "../models/User.js";

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: req.body
                },
                {
                    new: true
                }
            );
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                next(createError(404, "User not found"));
            }
        } catch (e) {
            next(e);
        }
    } else {
        next(createError(403, "You can update only your account"));
    }
};

export const deleteUser=async(req,res,next)=>{
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json("user has been deleted");
        } catch (e) {
            next(e);
        }
    } else {
        next(createError(403, "You can delete only your account"));
    }
}

export const getUser=async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
}

export const subscribe=async(req,res,next)=>{
    try{
        // mere mai jitne user ka channel subscibed h woh jaa rhe
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id}
        })
        // jis channel ko subscribe kiya uske ek increment
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subcribers:1}
        })
        res.status(200).json("Subscription successful")
    }catch(e){
        next(e);
    }
    
}
export const unsubsctibe=async(req,res,next)=>{
    try{
        // mere mai jitne user ka channel subscibed h woh jaa rhe
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id}
        })
        // jis channel ko subscribe kiya uske ek increment
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subcribers:-1}
        })
        res.status(200).json("unSubscription successful")
    }catch(e){
        next(e);
    }
    
}
export const like=async(req,res,next)=>{

}
export const dislike=async(req,res,next)=>{

}