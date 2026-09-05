import type { Request, Response } from 'express';
import { UserService } from '../services/user.service.ts';
import type { CreateUserDto, UpdateUserDto } from '../dto/user.dto.ts';

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await UserService.getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateUserDto;
    const user = await UserService.create(body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const body = req.body as UpdateUserDto;
    const user = await UserService.update(req.params.id, body);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await UserService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};