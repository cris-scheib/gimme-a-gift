import express from 'express';
import Middleware from '../middleware';

import DashboardController from '../controllers/dashboardController';
const dashboardController = new DashboardController();

const router = express.Router();

router.get('/count-lists', Middleware.validateToken, dashboardController.countLists);

export { router as dashboardRouter };
