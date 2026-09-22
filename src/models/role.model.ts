import { Schema, model, Document } from 'mongoose';

export interface IRole extends Document {
  label: string;
}

const roleSchema = new Schema<IRole>({
  label: { type: String, required: true },
});

export const RoleModel = model<IRole>('Role', roleSchema);