import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: { type: String, enum: ["chef", "user"], default: "user" },

    avatar: { type: String, default: null },

}, { timestamps: true });

 export const User = model("User", userSchema);
