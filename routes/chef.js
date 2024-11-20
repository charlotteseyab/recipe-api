import { Router } from "express";
import { chefRecipes, deleteChefRecipe, updateChefRecipe } from "../controllers/chef.js";



export const chefRouter = Router();

chefRouter.get("/recipes", chefRecipes);

chefRouter.patch("/recipes/:id", updateChefRecipe);

chefRouter.delete("/recipes/:id", deleteChefRecipe);

export default chefRouter;
