import express from 'express';
import { createUser, createSession, checkToken } from '../controllers/authController.js';
import { signupMiddleware, signinMiddleware } from '../middlewares/schemas.js';

const authRouter = express.Router()

authRouter
        .post('/signup', signupMiddleware, createUser)
        .post("/signin", signinMiddleware, createSession)
        .post("/token", checkToken)


export default authRouter;