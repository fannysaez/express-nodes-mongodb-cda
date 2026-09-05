import { ReservationModel } from "../models/reservation.model.ts";

const findAll = () => ReservationModel.find().populate('user').populate('room');

const findById = (id: string) => ReservationModel.findById(id).populate('user').populate('room');

const create = (data: { user: string; room: string; dateDebut: Date; dateFin: Date }) =>
  ReservationModel.create(data);

const update = (id: string, data: { user?: string; room?: string; dateDebut?: Date; dateFin?: Date }) =>
  ReservationModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

const remove = (id: string) => ReservationModel.findByIdAndDelete(id);

export const ReservationRepository = { findAll, findById, create, update, remove };