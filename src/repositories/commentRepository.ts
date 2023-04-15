import { prisma } from "../config/database.js";

async function getPostCommentsByPostId(postId: number) {
  return prisma.comments.findMany({
    where: {
      imageId: postId
    }
  });
}

async function insertCommentByPostId(postId: number, userId: number, comment: string) {
  return prisma.comments.create({
    data:{
      imageId:postId,
      userId:userId,
      text:comment
    }
  });
}

const commentRepository = {
  getPostCommentsByPostId,
  insertCommentByPostId
};

export default commentRepository