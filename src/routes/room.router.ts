import { Router } from 'express';
import * as RoomController from '../controllers/room.controller.ts';

const router = Router();

router.get('/', RoomController.getAll);
router.get('/:id', RoomController.getById);
router.post('/', RoomController.create);
router.put('/:id', RoomController.update);
router.delete('/:id', RoomController.remove);

export default router;