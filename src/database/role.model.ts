import { Schema, model, Document } from 'mongoose';

export interface IRole extends Document {
  libelle: string;
}

const roleSchema = new Schema<IRole>({
  libelle: { type: String, required: true },
});

export const RoleModel = model<IRole>('Role', roleSchema);