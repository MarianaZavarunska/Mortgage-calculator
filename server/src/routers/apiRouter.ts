import { Router } from 'express';

import {authRouter} from "./authRouter";
import {userRouter} from "./userRouter";

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/result', userRouter);


export const apiRouter = routes;
