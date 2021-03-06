import express from 'express';

import { homeRouter } from './home';
import { authRouter } from './auth';
import { userRouter } from './user';
import { listRouter } from './lists';
import { inviteRouter } from './invites';
import { productRouter } from './products';
import { userListRouter } from './userLists';
import { listProductRouter } from './listProduct';
import { paymentRouter } from './payments';
import { dashboardRouter } from './dashboard';

const routes = express.Router();
routes.use(homeRouter);
routes.use(authRouter);
routes.use(userRouter);
routes.use(listRouter);
routes.use(inviteRouter);
routes.use(productRouter);
routes.use(userListRouter);
routes.use(listProductRouter);
routes.use(paymentRouter);
routes.use(dashboardRouter);

export default routes;
