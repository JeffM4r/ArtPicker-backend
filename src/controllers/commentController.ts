import { Request, Response } from "express"
import { getComments, insertComment } from "../services/commentService.js"
import { comments } from "@prisma/client"


export async function createComment(req: Request, res: Response): Promise<void> {
  const userId: string = res.locals.user;
  const comment: string = res.locals.body.comment;
  const postId: string = req.params.postId;

  try {
    const insertedComment: comments = await insertComment(Number(userId), Number(postId), comment);

    res.status(201).send(insertedComment);
    return;

  } catch (error) {

    if (error.name === "postNotFound") {
      res.sendStatus(404);
      return;

    };

    res.sendStatus(500);
    return;
  }
}

export async function getCommentsByPostId(req: Request, res: Response): Promise<void> {
  const postId: string = req.params.postId;

  try {
    const comments: comments[] = await getComments(Number(postId));

    res.status(200).send(comments);
    return;

  } catch (error) {

    if (error.name === "postNotFound") {
      res.sendStatus(404);
      return;
    };

    res.sendStatus(500);
    return;
  }
}