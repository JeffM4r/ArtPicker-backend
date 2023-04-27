import { prisma } from "../config/database.js";
import { images, users, profilePictures } from "@prisma/client";

async function findUserById(userId: number): Promise<users & { profilePictures: profilePictures[]; }> {
  return prisma.users.findUnique({
    where: {
      id: userId
    },
    include: {
      profilePictures: true
    }
  });
}

async function getPosts(): Promise<images[]> {
  return prisma.images.findMany();
}

async function getPost(postId: number): Promise<images & { users: users & { profilePictures: profilePictures[]; }; }> {
  return prisma.images.findUnique({
    where: {
      id: postId
    },
    include: {
      users: {
        include: {
          profilePictures: true,
        }
      },
    },
  });
}

async function insertPost(body, userId: number, picLink: string, picSerial: string): Promise<images> {
  return prisma.images.create({
    data: {
      userId: userId,
      title: body.title,
      subtitle: body.subtitle,
      pictureLink: picLink,
      pictureSerial: picSerial
    }
  })
}

const postRepository = {
  findUserById,
  insertPost,
  getPost,
  getPosts
}

export default postRepository