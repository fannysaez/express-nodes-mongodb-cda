import { Schema, model, Document } from 'mongoose';

export interface IRole extends Document { role: string; }

const roleSchema = new Schema<IRole>({ role: { type: String, required: true } });

export const RoleModel = model<IRole>('Role', roleSchema);