import { RoomModel } from '../models/room.model.ts';
import type { CreateRoomDto, UpdateRoomDto } from '../dto/room.dto.ts';

const findAll = () => RoomModel.find();

const findById = (id: string) => RoomModel.findById(id);

const create = (data: CreateRoomDto) => RoomModel.create(data);

const update = (id: string, data: UpdateRoomDto) =>
  RoomModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

const remove = (id: string) => RoomModel.findByIdAndDelete(id);

export const RoomRepository = { findAll, findById, create, update, remove };