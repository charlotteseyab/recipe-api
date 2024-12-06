import { Router } from "express";
import { createComment, deleteComment, getAllComments, updateComment } from "../controllers/comments";

export const commentRouter = Router();

commentRouter.post('/comments', createComment);

commentRouter.get('/comment', getAllComments);

commentRouter.delete('/comments:id', deleteComment);

commentRouter.patch('/comments:id', updateComment);