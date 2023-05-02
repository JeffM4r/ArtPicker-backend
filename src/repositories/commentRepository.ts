import { prisma } from "../config/database.js";
import { comments, users, profilePictures } from "@prisma/client";

async function getPostCommentsByPostId(postId: number): Promise<(comments & { users: users & { profilePictures: profilePictures[]; }; })[]> {
  return prisma.comments.findMany({
    where: {
      imageId: postId
    },
    include: {
      users: {
        include: {
          profilePictures: true
        }
      }
    }
  });
}

async function insertCommentByPostId(postId: number, userId: number, comment: string): Promise<comments> {
  return prisma.comments.create({
    data: {
      imageId: postId,
      userId: userId,
      text: comment
    }
  });
}

const commentRepository = {
  getPostCommentsByPostId,
  insertCommentByPostId
};

export default commentRepository