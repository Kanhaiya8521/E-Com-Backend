import express from 'express';
const router = express.Router();

import UserController from './user_controller.js';

const userController = new UserController();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

export default router;