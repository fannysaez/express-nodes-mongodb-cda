import { Router } from 'express';
import * as UserController from '../controllers/user.controller.ts';
import validate from '../middlewares/validate.middleware.ts';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.ts';

const router = Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', validate(createUserSchema), UserController.create);
router.put('/:id', validate(updateUserSchema), UserController.update);
router.delete('/:id', UserController.remove);

export default router;