import express from "express";
import { LikeController } from "./like_controller.js";
const router = express.Router();

const likeController = new LikeController();

router.post("/", likeController.likeItem);
router.get("/getLikes", likeController.getLikes);



export default router;
