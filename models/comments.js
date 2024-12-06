import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    comment: { type: String, required: true },

    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },

}, { timestamps: true });

export const Comment = model("Comment", commentSchema);