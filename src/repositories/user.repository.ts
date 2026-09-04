import { UserModel } from "../models/user.model.ts";

const findAll = () => UserModel.find().populate('role');

const findById = (id: string) => UserModel.findById(id).populate('role');

const create = (data: { nom: string; prenom: string; email: string; motDePasse: string; role: string }) =>
  UserModel.create(data);

const update = (id: string, data: { nom?: string; prenom?: string; email?: string; motDePasse?: string; role?: string }) =>
  UserModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

const remove = (id: string) => UserModel.findByIdAndDelete(id);

export const UserRepository = { findAll, findById, create, update, remove };