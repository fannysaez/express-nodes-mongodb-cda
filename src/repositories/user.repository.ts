import { UserModel } from '../models/user.model.ts';
import type { CreateUserDto, UpdateUserDto } from '../dto/user.dto.ts';

const findAll = () => UserModel.find().populate('role');

const findById = (id: string) => UserModel.findById(id).populate('role');

const create = (data: CreateUserDto) => UserModel.create(data);

const update = (id: string, data: UpdateUserDto) =>
  UserModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

const remove = (id: string) => UserModel.findByIdAndDelete(id);

export const UserRepository = { findAll, findById, create, update, remove };