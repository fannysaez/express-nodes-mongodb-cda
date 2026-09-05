export interface CreateRoleDto {
  role: string;       // ton champ s'appelle "role" pas "name"
}

export interface UpdateRoleDto {
  role?: string;
}

export interface RoleDto {
  id: string;
  role: string;
}