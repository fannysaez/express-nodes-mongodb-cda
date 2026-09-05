import { ReservationRepository } from '../repositories/reservation.repository.ts';
import type { CreateReservationDto, UpdateReservationDto } from '../dto/reservation.dto.ts';

const getAll = () => ReservationRepository.findAll();

const getById = (id: string) => ReservationRepository.findById(id);

const create = (data: CreateReservationDto) =>
  ReservationRepository.create(data);

const update = (id: string, data: UpdateReservationDto) =>
  ReservationRepository.update(id, data);

const remove = (id: string) => ReservationRepository.remove(id);

export const ReservationService = { getAll, getById, create, update, remove };