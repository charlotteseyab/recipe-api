import { User } from "../models/user.js";
import { Recipe } from "../models/recipe.js";
import { updateRecipeValidator } from "../validators/recipe.js";

export const chefRecipes = async (req, res, next) => {
    try {
        // Find the chef by id
        const chef = await User.findById(req.auth.id);

        if (!chef) {
            return next(createError(404, "Chef not found"));
        }

        // Find all recipes by chef id
        const recipes = await Recipe.find({ chef: chef._id });

        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
};

export const updateChefRecipe = async (req, res, next) => {
    try {
        // Validate the request body
        const { error, value } = updateRecipeValidator.validate(req.body);
        if (error) {
            return res.status(404).json({ message: "Validation failed", details: error.details });
        }

        // Find the recipe by id and chef id
        const recipe = await Recipe.findById({ _id: req.params.id, chef: req.auth.id });

        // Update the recipe
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipe._id,
            { $set: value },
            { new: true }
        );

        res.status(200).json(updatedRecipe);
    } catch (error) {
        next(error);
    }
};

export const deleteChefRecipe = async (req, res, next) => {
    try {
        // Find the recipe by id and chef id
        const recipe = await Recipe.findById({
            _id: req.params.id,
            chef: req.auth.id
        });

        // Delete the recipe
        await Recipe.findByIdAndDelete(recipe._id);

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        next(error);
    }
}
