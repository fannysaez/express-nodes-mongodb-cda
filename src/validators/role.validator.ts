import Joi from 'joi';

export const createRoleSchema = Joi.object({
  role: Joi.string().required()
});

export const updateRoleSchema = Joi.object({
  role: Joi.string()
});