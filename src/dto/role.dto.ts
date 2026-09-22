export interface CreateRoleDto {
  label: string;
}

export interface UpdateRoleDto {
  label?: string;
}

export interface RoleDto {
  id: string;
  label: string;
}