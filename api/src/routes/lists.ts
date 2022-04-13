import express from 'express';
import Middleware from '../middleware';

import ListController from '../controllers/listController';
const listController = new ListController();

const router = express.Router();

router.get('/lists', Middleware.validateToken, listController.index);
router.post('/lists', Middleware.validateToken, listController.create);
router.get('/lists/:id', Middleware.validateToken, listController.show);
router.patch('/lists/:id', Middleware.validateToken, listController.update);
router.delete('/lists/:id', Middleware.validateToken, listController.destroy);

export { router as listRouter };
