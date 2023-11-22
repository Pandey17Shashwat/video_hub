import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addComments, deleteComments, getComments } from "../controllers/comment.js";


const router=express.Router();
router.post("/",verifyToken,addComments)
router.delete("/:id",verifyToken,deleteComments)
router.get("/:videoId",getComments)

export default router