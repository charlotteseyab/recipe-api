import { Recipe } from "../models/recipe.js";
import { createRecipeValidator, updateRecipeValidator } from "../validators/recipe.js";

export const createRecipe = async (req, res, next) => {
    try {
        // Validate the request body
        const { error, value } = createRecipeValidator.validate({
            ...req.body,
            image: req.file?.filename,
        });
        if (error) {
            return res.status(422).json({ message: "Validation failed", details: error.details });
        }

        // Create the recipe
        const recipe = await Recipe.create({
            ...value,
            user: req.auth.id,
        });

        // Return the created recipe
        return res.status(201).json({ message: "Recipe Created Successfully", recipe });

    } catch (error) {
        next(error);
    }
};

export const getAllRecipes = async (req, res, next) => {
    try {
        const { filter = "{}", limit = 10, skip = 0 } = req.query;

        //fetch recipes from database
        const recipes = await Recipe
            .find(JSON.parse(filter))
            .skip(skip)
            .limit(limit);

        //return the recipes
        return res.status(200).json({ message: "Recipes fetched successfully", recipes });
    } catch (error) {
        next(error)
    }
};

export const getRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: "Recipe fetched successfully", recipe });
    } catch (error) {
        next(error)
    }
};

export const updateRecipe = async (req, res, next) => {
    try {
        const {error, value} = updateRecipeValidator.validate({
            ...req.body,
            image: req.file?.filename,
        });
        if (error) {
            return res.status(422).json({ message: "Validation failed", details: error.details });
        }
        const recipe = await Recipe.findByIdAndUpdate({
            _id: req.params.id,
            user: req.auth.id,
        },     
            value,
            { new: true }
        );
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: "Recipe updated successfully", recipe });
    } catch (error) {
        next(error)
    }
};

export const deleteRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findOneAndDelete({
            _id: req.params.id,
            chef: req.auth.id,
        });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        next(error)
    }
};
