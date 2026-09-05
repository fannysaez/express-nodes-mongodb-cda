import Joi from 'joi';

export const createRoomSchema = Joi.object({
  nom: Joi.string().required(),
  capacite: Joi.number().required(),
  equipements: Joi.array().items(Joi.string())
});

export const updateRoomSchema = Joi.object({
  nom: Joi.string(),
  capacite: Joi.number(),
  equipements: Joi.array().items(Joi.string())
});