import express from 'express';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { postMiddleware } from '../middlewares/schemas.js';
import { sendPost, viewPosts, getSpecificPost } from '../controllers/postController.js';

const postsRouter = express.Router()

postsRouter
        .get("/", viewPosts)
        .get("/:id", getSpecificPost)
        .post('/', tokenValidation, postMiddleware, sendPost)


export default postsRouter;