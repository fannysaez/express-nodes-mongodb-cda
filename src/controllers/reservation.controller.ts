import type { Request, Response } from 'express';
import { ReservationService } from '../services/reservation.service.ts';

export const getAll = async (req: Request, res: Response) => {
  try {
    const reservations = await ReservationService.getAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const reservation = await ReservationService.getById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const reservation = await ReservationService.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const update = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const reservation = await ReservationService.update(req.params.id, req.body);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await ReservationService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};