export interface CreateRoomDto {
  name: string;
  capacity: number;
  equipments?: string[];
}

export interface UpdateRoomDto {
  name?: string;
  capacity?: number;
  equipments?: string[];
}

export interface RoomDto {
  id: string;
  name: string;
  capacity: number;
  equipments: string[];
}