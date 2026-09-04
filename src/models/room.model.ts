import { Schema, model, Document } from 'mongoose';

export interface IRoom extends Document {
  nom: string;
  capacite: number;
  equipements: string[];
}

const roomSchema = new Schema<IRoom>({
  nom: { type: String, required: true },
  capacite: { type: Number, required: true },
  equipements: { type: [String], default: [] }
});

export const RoomModel = model<IRoom>('Room', roomSchema);