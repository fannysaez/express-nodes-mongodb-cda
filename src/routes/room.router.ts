import { Router } from 'express';
import * as RoomController from '../controllers/room.controller.ts';
import validate from '../middlewares/validate.middleware.ts';
import { createRoomSchema, updateRoomSchema } from '../validators/room.validator.ts';

const router = Router();

router.get('/', RoomController.getAll);
router.get('/:id', RoomController.getById);
router.post('/', validate(createRoomSchema), RoomController.create);
router.put('/:id', validate(updateRoomSchema), RoomController.update);
router.delete('/:id', RoomController.remove);

export default router;