import express from 'express';
import { createUser } from '../controllers/authController.js';
import { signupMiddleware } from '../middlewares/schemas.js';

const authRouter = express.Router()

authRouter.post('/signup',signupMiddleware, createUser)


export default authRouter;