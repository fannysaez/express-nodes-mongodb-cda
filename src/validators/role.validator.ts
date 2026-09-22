import Joi from 'joi';

export const createRoleSchema = Joi.object({
  label: Joi.string().required()
});

export const updateRoleSchema = Joi.object({
  label: Joi.string()
});