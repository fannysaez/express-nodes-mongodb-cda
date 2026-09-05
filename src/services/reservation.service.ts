import { ReservationRepository } from '../repositories/reservation.repository.ts';

const getAll = () => ReservationRepository.findAll();

const getById = (id: string) => ReservationRepository.findById(id);

const create = (data: { user: string; room: string; dateDebut: Date; dateFin: Date }) =>
  ReservationRepository.create(data);

const update = (id: string, data: { user?: string; room?: string; dateDebut?: Date; dateFin?: Date }) =>
  ReservationRepository.update(id, data);

const remove = (id: string) => ReservationRepository.remove(id);

export const ReservationService = { getAll, getById, create, update, remove };