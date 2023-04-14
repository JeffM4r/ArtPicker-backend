import { Request, Response } from "express"
import { postImageinDb, getAllPosts, getPostbyId } from "../services/postServices.js"

export async function sendPost(req: Request, res: Response) {
  const userId = res.locals.user
  const body = res.locals.body

  try {

    const post = await postImageinDb(body, userId)
    delete post.userId

    return res.status(201).send(post)

  } catch (error) {

    return res.sendStatus(500)
  }
}

export async function viewPosts(req: Request, res: Response) {

  try {

    const posts = await getAllPosts()

    return res.status(200).send(posts)

  } catch (error) {

    if (error.name === "PostsNotFound") {
      return res.sendStatus(404);
    }

    return res.sendStatus(500)
  }
}

export async function getSpecificPost(req: Request, res: Response) {
  const postId = req.params.id

  try {

    const post = await getPostbyId(Number(postId))
    delete post.userId
    delete post.users.profilePictures[0].id
    delete post.users.profilePictures[0].userId
    delete post.users.profilePictures[0].pictureSerial

    return res.status(200).send(post)

  } catch (error) {
    
    if (error.name === "PostNotFound") {
      return res.sendStatus(404);
    }

    return res.sendStatus(500)
  }
}