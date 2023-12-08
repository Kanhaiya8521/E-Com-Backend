import express from 'express';
const router = express.Router();
import jwtAuth from "./../../middleware/jwt_middleware.js";

import UserController from './user_controller.js';

const userController = new UserController();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.put("/resetPassword", jwtAuth, userController.resetPassword);

export default router;