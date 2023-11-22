import express from 'express';
import { deleteUser, dislike, getUser, like, subscribe, unsubsctibe, update } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';


const router=express.Router();
// update
router.put("/:id",verifyToken,update);

// delete
router.delete("/:id",verifyToken,deleteUser);

// get
router.get("/find/:id",getUser);

// subscribe
router.put("/sub/:id",verifyToken,subscribe)
// unsubsctibe
router.put("/sub/:id",unsubsctibe)
// like 
router.put("/sub/:id",like)
// dislike
router.put("/sub/:id",dislike)
export default router;