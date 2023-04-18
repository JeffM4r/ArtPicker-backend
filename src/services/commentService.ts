import commentRepository from "../repositories/commentRepository.js";
import postRepository from "../repositories/postRepository.js";
import { comments, images, users, profilePictures } from "@prisma/client";

export async function getComments(postId: number): Promise<comments[]> {

  const post: images & { users: users & { profilePictures: profilePictures[]; }; } = await postRepository.getPost(postId)
  if (!post) {
    throw {
      name: "postNotFound",
      message: "post not found",
    };
  }

  const comments: comments[] = await commentRepository.getPostCommentsByPostId(postId)

  return comments;
}

export async function insertComment(userId: number, postId: number, comment: string): Promise<comments> {

  const post: images & { users: users & { profilePictures: profilePictures[]; }; } = await postRepository.getPost(postId)
  if (!post) {
    throw {
      name: "postNotFound",
      message: "post not found",
    };
  }

  const commentInserted: comments = await commentRepository.insertCommentByPostId(postId, userId, comment)

  return commentInserted;
}