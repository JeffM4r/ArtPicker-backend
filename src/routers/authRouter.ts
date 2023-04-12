import express from 'express';
import { createUser,createSession } from '../controllers/authController.js';
import { signupMiddleware,signinMiddleware } from '../middlewares/schemas.js';

const authRouter = express.Router()

authRouter
        .post('/signup',signupMiddleware, createUser)
        .post("/signin",signinMiddleware, createSession)


export default authRouter;