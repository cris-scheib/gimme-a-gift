import express from 'express';

import { homeRouter } from './home';
import { authRouter } from './auth';
import { userRouter } from './user';

const routes = express.Router();
routes.use(homeRouter);
routes.use(authRouter);
routes.use(userRouter);

export default routes;
