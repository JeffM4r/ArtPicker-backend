import { Request, Response } from "express"
import { postImageinDb, getAllPosts, getPostbyId } from "../services/postServices.js"
import { PostBody } from "src/config/types.js";
import { images, users, profilePictures } from "@prisma/client";

export async function sendPost(req: Request, res: Response): Promise<void> {
  const userId: number = res.locals.user;
  const body: PostBody = res.locals.body;

  try {

    const post: images = await postImageinDb(body, userId);
    delete post.userId;

    res.status(201).send(post);
    return;

  } catch (error) {

    res.sendStatus(500);
    return;
  }
}

export async function viewPosts(req: Request, res: Response): Promise<void> {

  try {

    const posts: images[] = await getAllPosts();

    res.status(200).send(posts.reverse());
    return;

  } catch (error) {

    if (error.name === "PostsNotFound") {
      res.sendStatus(404);
      return;
    };

    res.sendStatus(500);
    return;
  }
}

export async function getSpecificPost(req: Request, res: Response): Promise<void> {
  const postId: string = req.params.id;

  try {

    const post: images & { users: users & { profilePictures: profilePictures[]; }; } = await getPostbyId(Number(postId));
    delete post.userId;
    delete post.users.profilePictures[0].id;
    delete post.users.profilePictures[0].userId;
    delete post.users.profilePictures[0].pictureSerial;

    res.status(200).send(post);
    return;

  } catch (error) {

    if (error.name === "PostNotFound") {
      res.sendStatus(404);
      return;
    };

    res.sendStatus(500);
    return;
  }
}