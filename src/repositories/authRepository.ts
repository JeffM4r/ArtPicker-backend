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

async function insertSession(userId: number, refreshToken: string){
  return prisma.sessions.create({
    data:{
      userId: userId,
      token: refreshToken
    }
  })
}

async function findSession(userId: number){
  return prisma.sessions.findFirst({
    where:{
      userId: userId
    }
  })
}

async function findSessionbyToken(token: string){
  return prisma.sessions.findFirst({
    where:{
      token: token
    }
  })
}

async function deleteSession(id: number){
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