import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
    title: { type: String, required: true },

    description: { type: String },

    chef: { type: Schema.Types.ObjectId, ref: "User", required: true },

    category: { type: String, enum: ["breakfast", "lunch", "dinner", "dessert", "snack", "drink", "other"], required: true },

    ingredients: [{ type: String, required: true }],

    instructions: { type: String, required: true },

    image: { type: String, required: true },

    cookingTime: { type: Number }, 
}, { timestamps: true });

 export const Recipe = model("Recipe", recipeSchema);
