import type { Request, Response } from 'express';
import { login } from '../services/auth.service.ts';

export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await login(req.body);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user: result.user, token: result.token });

  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};