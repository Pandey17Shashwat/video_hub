import express from 'express';
import {} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';
import { addVideo, addView, getByTag, getVideo, random, search, sub, trend, updateVideo } from '../controllers/video.js';

const router=express.Router();

router.post("/",verifyToken,addVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,getVideo)
router.get("/find/:id",addVideo)
router.put("/video/:id",addView)
router.get("/trend",trend)
router.get("/random",random)
router.get("/sub",verifyToken,sub)
router.get("/tags",getByTag)
router.get("/search",search)

export default router