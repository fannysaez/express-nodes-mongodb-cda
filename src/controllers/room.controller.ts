import type { Request, Response } from 'express';
import { RoomService } from '../services/room.service.ts';

export const getAll = async (req: Request, res: Response) => {
  try {
    const rooms = await RoomService.getAll();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const room = await RoomService.getById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Salle non trouvée' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const room = await RoomService.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const room = await RoomService.update(req.params.id, req.body);
    if (!room) return res.status(404).json({ message: 'Salle non trouvée' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await RoomService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};