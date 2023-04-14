import { prisma } from "../config/database.js";

async function findUserById(userId: number) {
  return prisma.users.findUnique({
    where: {
      id: userId
    }
  });
}

async function getPosts() {
  return prisma.images.findMany();
}

async function getPost(postId: number) {
  return prisma.images.findUnique({
    where: {
      id: postId
    },
    include: {
      users: {
        include: {
          profilePictures:true,
        }
      },
    },
  });
}

async function insertPost(body, userId: number, picLink: string, picSerial: string) {
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