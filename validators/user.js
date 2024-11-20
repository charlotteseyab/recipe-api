import Joi from "joi";

export const registerValidator = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "user").default("user"),
});

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const updateProfileValidator = Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    role: Joi.string().valid("admin", "user"),
    password: Joi.string().min(6),
});
