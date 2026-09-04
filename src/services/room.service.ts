import { RoomRepository } from '../repositories/room.repository.ts';

const getAll = () => RoomRepository.findAll();

const getById = (id: string) => RoomRepository.findById(id);

const create = (data: { nom: string; capacite: number; equipements?: string[] }) =>
  RoomRepository.create(data);

const update = (id: string, data: { nom?: string; capacite?: number; equipements?: string[] }) =>
  RoomRepository.update(id, data);

const remove = (id: string) => RoomRepository.remove(id);

export const RoomService = { getAll, getById, create, update, remove };