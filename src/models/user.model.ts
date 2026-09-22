import { Schema, model, Document } from 'mongoose';
import type { Types } from 'mongoose';

export interface IUser extends Document {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  roleId: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
});

export const UserModel = model<IUser>('User', userSchema);