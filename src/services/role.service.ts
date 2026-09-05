import { RoleRepository } from '../repositories/role.repository.ts';
import type { CreateRoleDto, UpdateRoleDto } from '../dto/role.dto.ts';

const getAll = () => RoleRepository.findAll();

const getById = (id: string) => RoleRepository.findById(id);

const create = (data: CreateRoleDto) => RoleRepository.create(data);

const update = (id: string, data: UpdateRoleDto) => RoleRepository.update(id, data);

const remove = (id: string) => RoleRepository.remove(id);

export const RoleService = { getAll, getById, create, update, remove };