import express from 'express';

import { homeRouter } from './home';
import { authRouter } from './auth';
import { userRouter } from './user';
import { listRouter } from './lists';
import { inviteRouter } from './invites';
import { productRouter } from './products';

const routes = express.Router();
routes.use(homeRouter);
routes.use(authRouter);
routes.use(userRouter);
routes.use(listRouter);
routes.use(inviteRouter);
routes.use(productRouter);

export default routes;
