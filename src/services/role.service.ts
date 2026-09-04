import { RoleRepository } from '../repositories/role.repository.ts';

const getAll = () => RoleRepository.findAll();
const getById = (id: string) => RoleRepository.findById(id);
const create = (data: { role: string }) => RoleRepository.create(data);
const update = (id: string, data: { role: string }) => RoleRepository.update(id, data);
const remove = (id: string) => RoleRepository.remove(id);

export const RoleService = { getAll, getById, create, update, remove };