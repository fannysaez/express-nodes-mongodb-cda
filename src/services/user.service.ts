import { UserRepository } from '../repositories/user.repository.ts';
import type { CreateUserDto, UpdateUserDto } from '../dto/user.dto.ts';

const getAll = () => UserRepository.findAll();

const getById = (id: string) => UserRepository.findById(id);

const create = (data: CreateUserDto) => UserRepository.create(data);

const update = (id: string, data: UpdateUserDto) => UserRepository.update(id, data);

const remove = (id: string) => UserRepository.remove(id);

export const UserService = { getAll, getById, create, update, remove };