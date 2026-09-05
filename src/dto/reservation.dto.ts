export interface CreateReservationDto {
  user: string;
  room: string;
  dateDebut: string;
  dateFin: string;
}

export interface UpdateReservationDto {
  user?: string;
  room?: string;
  dateDebut?: string;
  dateFin?: string;
}

export interface ReservationDto {
  id: string;
  user: string;
  room: string;
  dateDebut: string;
  dateFin: string;
}