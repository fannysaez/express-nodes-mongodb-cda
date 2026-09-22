export interface CreateReservationDto {
  userId: string;
  roomId: string;
  startDate: string;
  endDate: string;
}

export interface UpdateReservationDto {
  userId?: string;
  roomId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ReservationDto {
  id: string;
  userId: string;
  roomId: string;
  startDate: string;
  endDate: string;
}