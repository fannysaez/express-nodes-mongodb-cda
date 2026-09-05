import { Router } from 'express';
import * as ReservationController from '../controllers/reservation.controller.ts';

const router = Router();

router.get('/', ReservationController.getAll);
router.get('/:id', ReservationController.getById);
router.post('/', ReservationController.create);
router.put('/:id', ReservationController.update);
router.delete('/:id', ReservationController.remove);

export default router;