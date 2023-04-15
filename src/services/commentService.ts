import commentRepository from "src/repositories/commentRepository";
import postRepository from "src/repositories/postRepository";

export async function getComments(postId: number) {

  const post = await postRepository.getPost(postId)
  if (!post) {
    throw {
      name: "postNotFound",
      message: "post not found",
    };
  }

  const comments = await commentRepository.getPostCommentsByPostId(postId)

  return comments;
}

export async function insertComment(userId: number, postId: number, comment: string) {

  const post = await postRepository.getPost(postId)
  if (!post) {
    throw {
      name: "postNotFound",
      message: "post not found",
    };
  }

  const commentInserted = await commentRepository.insertCommentByPostId(postId, userId, comment)

  return commentInserted;
}