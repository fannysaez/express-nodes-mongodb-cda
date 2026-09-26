import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cookieToken = req.cookies?.token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  const token = cookieToken || bearerToken;

  if (!token) {
    res.status(401).json({ message: 'Token manquant ou invalide' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token expiré ou invalide' });
  }
};