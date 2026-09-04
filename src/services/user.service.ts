import { UserRepository } from '../repositories/user.repository.ts';

const getAll = () => UserRepository.findAll();

const getById = (id: string) => UserRepository.findById(id);

const create = (data: { nom: string; prenom: string; email: string; motDePasse: string; role: string }) =>
  UserRepository.create(data);

const update = (id: string, data: { nom?: string; prenom?: string; email?: string; motDePasse?: string; role?: string }) =>
  UserRepository.update(id, data);

const remove = (id: string) => UserRepository.remove(id);

export const UserService = { getAll, getById, create, update, remove };