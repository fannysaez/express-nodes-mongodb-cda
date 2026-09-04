import { Router } from 'express';
import * as RoleController from '../controllers/role.controller.ts';

const router = Router();

router.get('/', RoleController.getAll);
router.get('/:id', RoleController.getById);
router.post('/', RoleController.create);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.remove);

export default router;