import Joi from "joi";

export const UserLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const UserRegisterOrEdit = Joi.object({
    email: Joi.string().email().required(),
});

