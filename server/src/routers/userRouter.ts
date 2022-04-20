import {Router} from "express";

import {userController} from "../controllers/userController";

const router = Router();

router.post('/', userController.sendResult);

export  const userRouter = router;