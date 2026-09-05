import type { Request, Response } from 'express';
import { RoleService } from '../services/role.service.ts';
import type { CreateRoleDto, UpdateRoleDto } from '../dto/role.dto.ts';

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
    const body = req.body as CreateRoleDto;
    const role = await RoleService.create(body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const body = req.body as UpdateRoleDto;
    const role = await RoleService.update(req.params.id, body);
    if (!role) return res.status(404).json({ message: 'Rôle non trouvé' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await RoleService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};