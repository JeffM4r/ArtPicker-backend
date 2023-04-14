import authRepository from "../repositories/authRepository.js"
import cloudinary from "../config/cloudinary.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserIdJWT } from "../config/types.js"



export async function postUserinDb(body: any) {
  const passwordEncrypted: string = bcrypt.hashSync(body.password, 10)
  const name: string = body.userName
  const email: string = body.email
  const image: string = body.image

  delete body.password

  const checkUserName = await authRepository.findUserByName(body.userName)
  if (checkUserName) {
    throw {
      name: "userNameAlreadyinUse",
      message: "this name is already in use",
    };
  }

  const checkUserEmail = await authRepository.findUserByEmail(body.email)
  if (checkUserEmail) {
    throw {
      name: "userEmailAlreadyinUse",
      message: "this email is already in use",
    };
  }

  const uploadedImage = await cloudinary.uploader.upload(image, {
    upload_preset: "artPicker"
  });

  const insertedUser = await authRepository.insertUser(name, email, passwordEncrypted)
  await authRepository.insertProfilePicture(insertedUser.id, uploadedImage.url, uploadedImage.public_id)

  return insertedUser
}

export async function checkUserinDb(body: any) {
  const email: string = body.email

  const checkUserEmail = await authRepository.findUserByEmail(email)
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

  const accessToken = await jwt.sign(
    {
      userId:checkUserEmail.id
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  )

  const refreshToken = await jwt.sign(
    {
      userId:checkUserEmail.id
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "365d",
    }
  )

  const oldSession = await authRepository.findSession(checkUserEmail.id)

  if(oldSession){

    await authRepository.deleteSession(oldSession.id)

  }

  await authRepository.insertSession(checkUserEmail.id, refreshToken)

  return {refreshToken, accessToken}
}

export async function generateAccessToken(token: string): Promise<string> {
  
  const sessionFound = await authRepository.findSessionbyToken(token)
  if (!sessionFound) {
    throw {
      name: "failedToFindSession",
      message: "session not found",
    };
  }

  const user = await jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET) as UserIdJWT
  const { userId } = user

  const accessToken = await jwt.sign(
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