import type { Request, Response } from 'express';
import { RoleService } from '../services/role.service.ts';

export const getAll = async (req: Request, res: Response) => {
  try {
    const roles = await RoleService.getAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const role = await RoleService.getById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Rôle non trouvé' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const role = await RoleService.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const role = await RoleService.update(req.params.id, req.body);
    if (!role) return res.status(404).json({ message: 'Rôle non trouvé' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const role = await RoleService.remove(req.params.id);
    if (!role) return res.status(404).json({ message: 'Rôle non trouvé' });
    res.json({ message: 'Rôle supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};