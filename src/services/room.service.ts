import { RoomRepository } from '../repositories/room.repository.ts';
import type { CreateRoomDto, UpdateRoomDto } from '../dto/room.dto.ts';

const getAll = () => RoomRepository.findAll();

const getById = (id: string) => RoomRepository.findById(id);

const create = (data: CreateRoomDto) => RoomRepository.create(data);

const update = (id: string, data: UpdateRoomDto) => RoomRepository.update(id, data);

const remove = (id: string) => RoomRepository.remove(id);

export const RoomService = { getAll, getById, create, update, remove };