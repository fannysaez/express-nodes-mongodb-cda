import { RoomModel } from "../models/room.model.ts";

const findAll = () => RoomModel.find();

const findById = (id: string) => RoomModel.findById(id);

const create = (data: { nom: string; capacite: number; equipements?: string[] }) =>
  RoomModel.create(data);

const update = (id: string, data: { nom?: string; capacite?: number; equipements?: string[] }) =>
  RoomModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

const remove = (id: string) => RoomModel.findByIdAndDelete(id);

export const RoomRepository = { findAll, findById, create, update, remove };