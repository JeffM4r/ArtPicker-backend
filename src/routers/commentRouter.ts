import express from 'express';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { commentMiddleware } from '../middlewares/schemas.js';
import { createComment,getCommentsByPostId } from "../controllers/commentController.js"

const commentsRouter = express.Router()

commentsRouter
  .get('/:postId', getCommentsByPostId)
  .post('/:postId', tokenValidation, commentMiddleware, createComment)


export default commentsRouter;