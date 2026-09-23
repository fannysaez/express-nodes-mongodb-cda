import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.ts';
import type { LoginDto } from '../dto/auth.dto.ts';

export const login = async (dto: LoginDto) => {
  const user = await UserModel.findOne({ email: dto.email }).populate('roleId');

  if (!user) throw new Error('Email ou mot de passe incorrect');

  const isValid = await bcrypt.compare(dto.password, user.password);
  if (!isValid) throw new Error('Email ou mot de passe incorrect');

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '24h' }
  );

  const role = user.roleId as any;

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      lastname: user.lastname,
      firstname: user.firstname,
      roleLabel: role?.label ?? '',
    },
  };
};