import { RoleModel } from "../models/role.model.ts";

const findAll = () => RoleModel.find();
const findById = (id: string) => RoleModel.findById(id);
const create = (data: { role: string }) => RoleModel.create(data);
const update = (id: string, data: { role: string }) =>
  RoleModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
const remove = (id: string) => RoleModel.findByIdAndDelete(id);

export const RoleRepository = { findAll, findById, create, update, remove };
