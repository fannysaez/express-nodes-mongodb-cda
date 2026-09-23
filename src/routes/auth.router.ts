import { Router } from 'express';
import { loginController } from '../controllers/auth.controller.ts';
import validate from '../middlewares/validate.middleware.ts';
import { loginSchema } from '../validators/auth.validator.ts';

const authRouter = Router();

authRouter.post('/login', validate(loginSchema), loginController);

export default authRouter;