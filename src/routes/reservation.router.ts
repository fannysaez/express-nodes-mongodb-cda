import { Router } from 'express';
import * as ReservationController from '../controllers/reservation.controller.ts';
import validate from '../middlewares/validate.middleware.ts';
import { createReservationSchema, updateReservationSchema } from '../validators/reservation.validator.ts';

const router = Router();

router.get('/', ReservationController.getAll);
router.get('/:id', ReservationController.getById);
router.post('/', validate(createReservationSchema), ReservationController.create);
router.put('/:id', validate(updateReservationSchema), ReservationController.update);
router.delete('/:id', ReservationController.remove);

export default router;