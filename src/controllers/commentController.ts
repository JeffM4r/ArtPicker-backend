import { Request, Response } from "express"
import { getComments, insertComment } from "../services/commentService.js"
import { comments } from "@prisma/client"


export async function createComment(req: Request, res: Response) {
  const userId = res.locals.user
  const comment = res.locals.body.comment
  const postId = req.params.postId

  try {
    const insertedComment:comments = await insertComment(Number(userId), Number(postId), comment)

    return res.status(201).send(insertedComment)

  } catch (error) {

    if (error.name === "postNotFound") {
      return res.sendStatus(404);
    }

    return res.sendStatus(500)
  }
}

export async function getCommentsByPostId(req: Request, res: Response) {
  const postId = req.params.postId

  try {
    const comments:comments[] = await getComments(Number(postId))

    return res.status(200).send(comments)

  } catch (error) {

    if (error.name === "postNotFound") {
      return res.sendStatus(404);
    }

    return res.sendStatus(500)
  }
}