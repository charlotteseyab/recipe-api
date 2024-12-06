import { Comment } from "../models/comments.js";

export const createComment = async(req, res, next) => {
    try {
        const comment =  new Comment({
            ...req.body,
            user: req.auth.id,
            recipe: req.params.id
        })
        await comment.save()
        res.status(201).json({message: "Comment created successfully", comment})
    } catch (error) {
        next(error)
    }
}

export const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({recipe: req.params.id})
        res.status(200).json({message: "Comments fetched successfully", comments})
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
       const deletedComment = await Comment.findByIdAndDelete(req.params.id);
       if (!deletedComment) {
        return res.status(404).json({message: "Comment not found"});
       }
        res.status(200).json({message: "Comment deleted successfully"})
    } catch (error) {
        next(error)
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!comment) {
            return res.status(404).json({message:"Comment not found"});
        }
        res.status(200).json({message: "Comment updated successfully", comment})
    } catch (error) {
        next(error)
    }
}