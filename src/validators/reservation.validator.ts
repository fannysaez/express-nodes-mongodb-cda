import Joi from 'joi';

export const createReservationSchema = Joi.object({
  userId: Joi.string().required(),
  roomId: Joi.string().required(),
  startDate: Joi.string().isoDate().required(),
  endDate: Joi.string().isoDate().required()
});

export const updateReservationSchema = Joi.object({
  userId: Joi.string(),
  roomId: Joi.string(),
  startDate: Joi.string().isoDate(),
  endDate: Joi.string().isoDate()
});