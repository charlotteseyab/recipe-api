import Joi from "joi";

export const createRecipeValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    chef: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    category: Joi.string().valid("breakfast", "lunch", "dinner", "dessert", "snack", "drink", "other").required(),
    instructions: Joi.string().required(),
    image: Joi.string().optional(),
    cookingTime: Joi.number().required(),
});

export const updateRecipeValidator = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    ingredients: Joi.array().items(Joi.string()).optional(),
    instructions: Joi.string().optional(),
    image: Joi.string().optional(),
    cookingTime: Joi.number().optional(),
});
