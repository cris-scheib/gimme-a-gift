import express from 'express';

import AuthController from '../controllers/authController';
const authController = new AuthController();

const router = express.Router();

router.post('/login', authController.store);

export { router as authRouter };
