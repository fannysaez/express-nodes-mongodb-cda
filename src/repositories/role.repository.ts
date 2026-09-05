import { RoleModel } from '../models/role.model.ts';
import type { CreateRoleDto, UpdateRoleDto } from '../dto/role.dto.ts';

const findAll = () => RoleModel.find();

const findById = (id: string) => RoleModel.findById(id);

const create = (data: CreateRoleDto) => RoleModel.create(data);

const update = (id: string, data: UpdateRoleDto) =>
  RoleModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

const remove = (id: string) => RoleModel.findByIdAndDelete(id);

export const RoleRepository = { findAll, findById, create, update, remove };