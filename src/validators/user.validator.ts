import Joi from 'joi';

export const createUserSchema = Joi.object({
  lastname: Joi.string().required(),
  firstname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  roleId: Joi.string().required()
});

export const updateUserSchema = Joi.object({
  lastname: Joi.string(),
  firstname: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(4),
  roleId: Joi.string()
});