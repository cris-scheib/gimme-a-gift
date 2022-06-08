import express from 'express';
import Middleware from '../middleware';

import ListProductController from '../controllers/listProductController';
const listProductController = new ListProductController();

const router = express.Router();

router.post('/list-product/', Middleware.validateToken, listProductController.create);
router.delete('/list-product/:id/:productId', Middleware.validateToken, listProductController.destroy);

export { router as listProductRouter };
