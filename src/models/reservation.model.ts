import { Schema, model, Document } from 'mongoose';
import type { Types } from 'mongoose';

export interface IReservation extends Document {
  user: Types.ObjectId;
  room: Types.ObjectId;
  dateDebut: Date;
  dateFin: Date;
}

const reservationSchema = new Schema<IReservation>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true }
});

export const ReservationModel = model<IReservation>('Reservation', reservationSchema);