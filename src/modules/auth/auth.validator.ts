import Joi from "joi";

export const registerSchemaValidator = Joi.object({
  name: Joi.string().max(50).min(2).required(),
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_]+$/)
    .message("Username is not valid")
    .trim()
    .min(3)
    .max(50)
    .required(),
  email: Joi.string()
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .message("Email is not valid")
    .email({ tlds: { allow: ["com", "yahoo"] } })
    .required(),
  password: Joi.string().min(8).max(30).required(),
  confirmPassword: Joi.valid(Joi.ref("password")).required(),
});
export const resetPasswordSchemaValidator = Joi.object({
  password: Joi.string().min(8).max(30).required(),
  confirmPassword: Joi.valid(Joi.ref("password")).required(),
});
