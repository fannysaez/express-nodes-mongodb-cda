import { Router } from 'express';
import * as RoleController from '../controllers/role.controller.ts';
import validate from '../middlewares/validate.middleware.ts';
import { createRoleSchema, updateRoleSchema } from '../validators/role.validator.ts';

const router = Router();

router.get('/', RoleController.getAll);
router.get('/:id', RoleController.getById);
router.post('/', validate(createRoleSchema), RoleController.create);
router.put('/:id', validate(updateRoleSchema), RoleController.update);
router.delete('/:id', RoleController.remove);

export default router;