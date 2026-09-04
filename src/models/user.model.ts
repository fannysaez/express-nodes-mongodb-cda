import { Schema, model, Document } from 'mongoose';
import type { Types } from 'mongoose';

export interface IUser extends Document {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
});

export const UserModel = model<IUser>('User', userSchema);