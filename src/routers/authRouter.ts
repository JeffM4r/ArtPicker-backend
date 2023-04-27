import express from 'express';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { createUser, createSession, checkToken, sendUser } from '../controllers/authController.js';
import { signupMiddleware, signinMiddleware } from '../middlewares/schemas.js';

const authRouter = express.Router()

authRouter
        .post('/signup', signupMiddleware, createUser)
        .post("/signin", signinMiddleware, createSession)
        .get("/user", tokenValidation, sendUser)
        .post("/token", checkToken)


export default authRouter;