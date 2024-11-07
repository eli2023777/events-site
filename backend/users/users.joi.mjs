import Joi from "joi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/;

export const UserLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const UserRegisterOrEdit = Joi.object({
    email: Joi.string().email().required(),
    // password: Joi.string().required().regex(passwordRegex),
    // first: Joi.string().required().alphanum().min(2).max(20),
    // last: Joi.string().required().alphanum().min(2).max(20),
    // phone: Joi.string().required().min(2).max(15),
});

