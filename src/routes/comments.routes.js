import express from "express";
import { getCommentsByPost, createComment } from "./../controllers/comments.controllers.js";

const router = express.Router();

router.get("/:postId", getCommentsByPost);
router.post("/", createComment);

export default router;
