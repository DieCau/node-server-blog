import express from "express";
import { getCommentsByPost, createComment } from "./../controllers/coment.controllers.js";

const router = express.Router();

router.get("/:postId", getCommentsByPost);
router.post("/", createComment);

export default router;
