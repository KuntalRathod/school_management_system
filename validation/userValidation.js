// userValidation.js
import Joi from "joi"

export const userSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name should have at least 3 characters",
    "string.max": "Name should have at most 50 characters",
  }),

  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username should contain only letters and numbers",
    "string.min": "Username should have at least 3 characters",
    "string.max": "Username should have at most 30 characters",
  }),

  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@gmail\.com$/))
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.pattern.base": "Invalid email format",
    }),

  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/
      )
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must be between 7-9 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#)",
    }),

  usertype: Joi.string().valid("admin", "user", "guest").required().messages({
    "string.empty": "User type is required",
    "any.only": "User type must be either admin, user, or guest",
  }),

  profileImage: Joi.string().messages({
    "string.base": "Profile image must be a string",
  }),
})

export const updateUserSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name should have at least 3 characters",
    "string.max": "Name should have at most 50 characters",
  }),

  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username should contain only letters and numbers",
    "string.min": "Username should have at least 3 characters",
    "string.max": "Username should have at most 30 characters",
  }),

  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@gmail\.com$/))
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.pattern.base": "Invalid email format",
    }),

  usertype: Joi.string().valid("admin", "user", "guest").required().messages({
    "string.empty": "User type is required",
    "any.only": "User type must be either admin, user, or guest",
  }),
})

export const validateUser = (userSchemaValidation) => {
  return (req, res, next) => {
    const { error } = userSchemaValidation.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.message })
    }
    next()
  }
}
