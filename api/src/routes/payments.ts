import express from 'express';
import Middleware from '../middleware';

import PaymentController from '../controllers/paymentController';
const paymentController = new PaymentController();

const router = express.Router();

router.get('/payments', Middleware.validateToken, paymentController.index);
router.get('/my-payments', Middleware.validateToken, paymentController.myPayments);
router.post('/payments', Middleware.validateToken, paymentController.create);
router.get('/payments/:id', Middleware.validateToken, paymentController.show);
router.delete('/payments/:id', Middleware.validateToken, paymentController.destroy);

export { router as paymentRouter };
