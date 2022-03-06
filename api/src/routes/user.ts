import express from 'express';
import Middleware from '../middleware';

import UserController from '../controllers/userController';
const userController = new UserController();

const router = express.Router();

router.post('/users', userController.store);
router.get('/users', userController.index);
router.patch('/users/:id', Middleware.validateToken, userController.update);
router.delete('/users', Middleware.validateToken, userController.destroy);
router.post('/users/rebuild', Middleware.validateToken, userController.rebuild);
router.get('/profile', Middleware.validateToken, userController.show);

export { router as userRouter };
