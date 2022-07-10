import express from 'express';

import AuthController from '../controllers/authController';
const authController = new AuthController();

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.delete('/users/:id/destroy', authController.destroy);

export { router as authRouter };
