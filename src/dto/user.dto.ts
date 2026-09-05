export interface CreateUserDto {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: string;       // ObjectId en string
}

export interface UpdateUserDto {
  nom?: string;
  prenom?: string;
  email?: string;
  motDePasse?: string;
  role?: string;
}

export interface UserDto {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  // motDePasse absent volontairement — jamais exposé en réponse
}