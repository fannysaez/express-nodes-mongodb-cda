import { Schema, model, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  capacity: number;
  equipments: string[];
}

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  equipments: { type: [String], default: [] }
});

export const RoomModel = model<IRoom>('Room', roomSchema);