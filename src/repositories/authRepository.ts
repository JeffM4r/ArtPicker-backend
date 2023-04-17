import { prisma } from "../config/database.js";
import { sessions, users, profilePictures } from "@prisma/client";

async function findUserByName(userName: string): Promise<users> {
  return prisma.users.findFirst({
    where: {
      userName: userName
    }
  });
}

async function findUserByEmail(email: string): Promise<users> {
  return prisma.users.findFirst({
    where: {
      email: email
    }
  });
}

async function insertUser(userName: string, email: string, password: string): Promise<users> {
  return prisma.users.create({
    data: {
      userName: userName,
      email: email,
      password: password
    }
  })
}

async function insertProfilePicture(userId: number, pictureLink: string, pictureSerial: string): Promise<profilePictures> {
  return prisma.profilePictures.create({
    data: {
      userId: userId,
      pictureLink: pictureLink,
      pictureSerial: pictureSerial
    }
  })
}

async function insertSession(userId: number, refreshToken: string): Promise<sessions> {
  return prisma.sessions.create({
    data: {
      userId: userId,
      token: refreshToken
    }
  })
}

async function findSession(userId: number): Promise<sessions> {
  return prisma.sessions.findFirst({
    where: {
      userId: userId
    }
  })
}

async function findSessionbyToken(token: string): Promise<sessions> {
  return prisma.sessions.findFirst({
    where: {
      token: token
    }
  })
}

async function deleteSession(id: number): Promise<sessions> {
  return prisma.sessions.delete({
    where: {
      id: id
    },
  })
}

const authRepository = {
  findUserByName,
  findUserByEmail,
  insertProfilePicture,
  insertUser,
  insertSession,
  findSession,
  findSessionbyToken,
  deleteSession
};

export default authRepository