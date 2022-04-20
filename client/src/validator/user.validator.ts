import Joi from "joi";
import { reqexp } from "../constants/reqexp";

export const userValidator = {
  logIn: Joi.object({
    email: Joi.string().regex(new RegExp(reqexp.EMAIL)).required().messages({
      "string.pattern.base": "Example generator@gmail.com",
      "string.empty": "Email is required",
    }),
    password: Joi.string()
      .regex(new RegExp(reqexp.PASSWORD))
      .required()
      .messages({
        "string.pattern.base":
          "Minimum eight characters, at least one letter and one number:",
        "string.empty": "Password is required",
      }),
  }),
};
