import { ReservationModel } from "../models/reservation.model.ts";
import type { CreateReservationDto, UpdateReservationDto } from '../dto/reservation.dto.ts';

const findAll = () => ReservationModel.find().populate('userId').populate('roomId');

const findById = (id: string) => ReservationModel.findById(id).populate('userId').populate('roomId');

const create = (data: CreateReservationDto) =>
  ReservationModel.create(data);

const update = (id: string, data: UpdateReservationDto) =>
  ReservationModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

const patch = (id: string, data: UpdateReservationDto) =>
  ReservationModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

const remove = (id: string) => ReservationModel.findByIdAndDelete(id);

export const ReservationRepository = { findAll, findById, create, update, patch, remove };