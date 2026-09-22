export interface CreateUserDto {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  roleId: string;
}

export interface UpdateUserDto {
  lastname?: string;
  firstname?: string;
  email?: string;
  password?: string;
  roleId?: string;
}

export interface UserDto {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  roleId: string;
  // password absent volontairement — jamais exposé en réponse
}