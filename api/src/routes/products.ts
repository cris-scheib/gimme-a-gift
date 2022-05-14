import express from 'express';
import Middleware from '../middleware';

import ProductController from '../controllers/productController';
const productController = new ProductController();

const router = express.Router();

router.get('/products', Middleware.validateToken, productController.index);
router.post('/products', Middleware.validateToken, productController.create);
router.get('/products/:id', Middleware.validateToken, productController.show);
router.patch('/products/:id', Middleware.validateToken, productController.update);
router.delete('/products/:id', Middleware.validateToken, productController.destroy);

export { router as productRouter };
