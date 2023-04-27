import authRepository from "../repositories/authRepository.js"
import postRepository from "../repositories/postRepository.js"
import cloudinary from "../config/cloudinary.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserIdJWT } from "../config/types.js"
import { sessions, users, profilePictures } from "@prisma/client"
import { SignupBody, SigninBody } from "../config/types.js"
import { UploadApiResponse } from "cloudinary"



export async function postUserinDb(body: SignupBody): Promise<users> {
  const passwordEncrypted: string = bcrypt.hashSync(body.password, 10)
  const name: string = body.userName
  const email: string = body.email
  const image: string = body.image

  delete body.password

  const checkUserName: users = await authRepository.findUserByName(body.userName)
  if (checkUserName) {
    throw {
      name: "userNameAlreadyinUse",
      message: "this name is already in use",
    };
  }

  const checkUserEmail: users = await authRepository.findUserByEmail(body.email)
  if (checkUserEmail) {
    throw {
      name: "userEmailAlreadyinUse",
      message: "this email is already in use",
    };
  }

  const uploadedImage: UploadApiResponse = await cloudinary.uploader.upload(image, {
    upload_preset: "artPicker"
  });

  const insertedUser: users = await authRepository.insertUser(name, email, passwordEncrypted)
  await authRepository.insertProfilePicture(insertedUser.id, uploadedImage.url, uploadedImage.public_id)

  return insertedUser
}

export async function checkUserinDb(body: SigninBody): Promise<{ refreshToken: string; accessToken: string; }> {
  const email: string = body.email

  const checkUserEmail: users = await authRepository.findUserByEmail(email)
  if (!checkUserEmail) {
    throw {
      name: "failedToSignIn",
      message: "user not found",
    };
  }

  if (!bcrypt.compareSync(body.password, checkUserEmail.password)) {
    throw {
      name: "failedToSignIn",
      message: "wrong password",
    };
  }

  delete body.password;

  const accessToken: string = await jwt.sign(
    {
      userId: checkUserEmail.id
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  )

  const refreshToken: string = await jwt.sign(
    {
      userId: checkUserEmail.id
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "365d",
    }
  )

  const oldSession: sessions = await authRepository.findSession(checkUserEmail.id)

  if (oldSession) {

    await authRepository.deleteSession(oldSession.id)

  }

  await authRepository.insertSession(checkUserEmail.id, refreshToken)

  return { refreshToken, accessToken }
}

export async function getUser(userId: number): Promise<users & { profilePictures: profilePictures[]; }> {

  const userFound: users & { profilePictures: profilePictures[]; } = await postRepository.findUserById(userId)
  if (!userFound) {
    throw {
      name: "failedToFindUser",
      message: "user not found",
    };
  }

  return userFound
}

export async function generateAccessToken(token: string): Promise<string> {

  const sessionFound: sessions = await authRepository.findSessionbyToken(token)
  if (!sessionFound) {
    throw {
      name: "failedToFindSession",
      message: "session not found",
    };
  }

  const user: UserIdJWT = await jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET) as UserIdJWT
  const userId: number = user.userId

  const accessToken: string = await jwt.sign(
    {
      userId: userId
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  )

  return accessToken
}