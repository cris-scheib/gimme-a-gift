import express from 'express';
import Middleware from '../middleware';

import InviteController from '../controllers/inviteController';
const inviteController = new InviteController();

const router = express.Router();

router.post('/invites', Middleware.validateToken, inviteController.create);

export { router as inviteRouter };
