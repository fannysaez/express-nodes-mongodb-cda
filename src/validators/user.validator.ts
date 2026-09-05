import Joi from 'joi';

export const createUserSchema = Joi.object({
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  email: Joi.string().email().required(),
  motDePasse: Joi.string().min(4).required(),
  role: Joi.string().required()
});

export const updateUserSchema = Joi.object({
  nom: Joi.string(),
  prenom: Joi.string(),
  email: Joi.string().email(),
  motDePasse: Joi.string().min(4),
  role: Joi.string()
});