import express from 'express';
import Middleware from '../middleware';

import UserListController from '../controllers/userListController';
const userListController = new UserListController();

const router = express.Router();

router.delete('/user-list/:id/:userId?', Middleware.validateToken, userListController.destroy);

export { router as userListRouter };
