import { Router } from 'express';

import { authController } from '../controllers/auth.controller';
import {
    authMiddleware, userMiddleware, authValidationMiddleware,
} from '../middlewares';

const router = Router();

router.post('/registration', authValidationMiddleware.validateRegisterUser, authController.registration);
router.post('/login', authValidationMiddleware.validateLoginUser, userMiddleware.checkIfUserExists, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);


 export const authRouter = router;
