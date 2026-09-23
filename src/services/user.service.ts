import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository.ts';
import type { CreateUserDto, UpdateUserDto } from '../dto/user.dto.ts';

const getAll = () => UserRepository.findAll();

const getById = (id: string) => UserRepository.findById(id);

const create = async (data: CreateUserDto) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return UserRepository.create({ ...data, password: hashedPassword });
};

const update = (id: string, data: UpdateUserDto) => UserRepository.update(id, data);

const patch = (id: string, data: UpdateUserDto) => UserRepository.patch(id, data);

const remove = (id: string) => UserRepository.remove(id);

export const UserService = { getAll, getById, create, update, patch, remove };