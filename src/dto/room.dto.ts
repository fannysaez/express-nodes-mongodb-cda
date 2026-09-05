export interface CreateRoomDto {
  nom: string;
  capacite: number;
  equipements?: string[];
}

export interface UpdateRoomDto {
  nom?: string;
  capacite?: number;
  equipements?: string[];
}

export interface RoomDto {
  id: string;
  nom: string;
  capacite: number;
  equipements: string[];
}