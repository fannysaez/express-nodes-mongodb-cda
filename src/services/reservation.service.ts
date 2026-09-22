import { ReservationRepository } from '../repositories/reservation.repository.ts';
import type { CreateReservationDto, UpdateReservationDto } from '../dto/reservation.dto.ts';

const getAll = () => ReservationRepository.findAll();

const getById = (id: string) => ReservationRepository.findById(id);

const create = async (data: CreateReservationDto) => {
  const conflict = await ReservationRepository.findConflict(
    data.roomId, data.startDate, data.endDate
  );
  if (conflict) throw new Error('Cette salle est déjà réservée sur ce créneau');
  return ReservationRepository.create(data);
};

const update = async (id: string, data: UpdateReservationDto) => {
  if (data.roomId && data.startDate && data.endDate) {
    const conflict = await ReservationRepository.findConflict(
      data.roomId, data.startDate, data.endDate, id
    );
    if (conflict) throw new Error('Cette salle est déjà réservée sur ce créneau');
  }
  return ReservationRepository.update(id, data);
};

const patch = (id: string, data: UpdateReservationDto) => ReservationRepository.patch(id, data);

const remove = (id: string) => ReservationRepository.remove(id);

export const ReservationService = { getAll, getById, create, update, patch, remove };