import { Router } from "express";
import { createRecipe, deleteRecipe, getAllRecipes, getRecipe, updateRecipe } from "../controllers/recipe.js";
import { hasPermission, isAuthenticated } from "../middleware/auth.js";
import { recipeIconUpload } from "../middleware/upload.js";


export const recipeRouter = Router();


recipeRouter.post('/recipes', isAuthenticated, hasPermission('create_recipe'), recipeIconUpload.single('image'), createRecipe);

recipeRouter.get('/recipes', getAllRecipes);

recipeRouter.get('/recipes/:id', getRecipe);

// recipeRouter.patch('/recipes/:id', recipeIconUpload.single('image'), updateRecipe);

// recipeRouter.delete('/recipes/:id', deleteRecipe);

export default recipeRouter;