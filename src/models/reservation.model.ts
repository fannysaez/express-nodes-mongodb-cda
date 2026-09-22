import { Schema, model, Document } from 'mongoose';
import type { Types } from 'mongoose';

export interface IReservation extends Document {
  userId: Types.ObjectId;
  roomId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
}

const reservationSchema = new Schema<IReservation>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

export const ReservationModel = model<IReservation>('Reservation', reservationSchema);