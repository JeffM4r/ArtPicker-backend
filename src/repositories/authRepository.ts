import { prisma } from "../config/database.js";

async function findUserByName(userName: string) {
  return prisma.users.findFirst({
    where: {
      userName: userName
    }
  });
}

async function findUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: {
      email: email
    }
  });
}

async function insertUser(userName: string, email: string, password: string) {
  return prisma.users.create({
    data: {
      userName: userName,
      email: email,
      password: password
    }
  })
}

async function insertProfilePicture(userId: number, pictureLink: string, pictureSerial: string) {
  return prisma.profilePictures.create({
    data: {
      userId: userId,
      pictureLink: pictureLink,
      pictureSerial: pictureSerial
    }
  })
}

const authRepository = {
  findUserByName,
  findUserByEmail,
  insertProfilePicture,
  insertUser
};

export default authRepository