import Joi from 'joi';

export const createReservationSchema = Joi.object({
  user: Joi.string().required(),
  room: Joi.string().required(),
  dateDebut: Joi.string().isoDate().required(),
  dateFin: Joi.string().isoDate().required()
});

export const updateReservationSchema = Joi.object({
  user: Joi.string(),
  room: Joi.string(),
  dateDebut: Joi.string().isoDate(),
  dateFin: Joi.string().isoDate()
});