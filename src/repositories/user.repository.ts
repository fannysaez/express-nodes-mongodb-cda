import { UserModel } from '../models/user.model.ts';
import type { CreateUserDto, UpdateUserDto } from '../dto/user.dto.ts';

const findAll = () => UserModel.find().populate('roleId');  // ← role → roleId

const findById = (id: string) => UserModel.findById(id).populate('roleId');  // ← role → roleId

const create = (data: CreateUserDto) => UserModel.create(data);

const update = (id: string, data: UpdateUserDto) =>
  UserModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

const remove = (id: string) => UserModel.findByIdAndDelete(id);

export const UserRepository = { findAll, findById, create, update, remove };