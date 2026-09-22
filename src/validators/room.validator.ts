import Joi from 'joi';

export const createRoomSchema = Joi.object({
  name: Joi.string().required(),
  capacity: Joi.number().required(),
  equipments: Joi.array().items(Joi.string())
});

export const updateRoomSchema = Joi.object({
  name: Joi.string(),
  capacity: Joi.number(),
  equipments: Joi.array().items(Joi.string())
});