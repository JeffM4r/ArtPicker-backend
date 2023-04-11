import authRepository from "../repositories/authRepository.js"
import cloudinary from "../config/cloudinary.js"
import bcrypt from "bcrypt"

export async function  postUserinDb(body:any){
  const passwordEncrypted:string = bcrypt.hashSync(body.password,10)
  const name:string = body.userName
  const email:string = body.email
  const image:string = body.image

  delete body.password

  const checkUserName = await authRepository.findUserByName(body.userName)
  if (checkUserName) {
    throw {
      name: "userNameAlreadyinUse",
      message: "this name is already used",
    };
  }

  const checkUserEmail = await authRepository.findUserByEmail(body.email)
  if (checkUserEmail) {
    throw {
      name: "userEmailAlreadyinUse",
      message: "this email is already used",
    };
  }  

  const uploadedImage = await cloudinary.uploader.upload(image, {
    upload_preset: "artPicker"
  });
  
  const insertedUser = await authRepository.insertUser(name, email, passwordEncrypted)
  await authRepository.insertProfilePicture(insertedUser.id, uploadedImage.url, uploadedImage.public_id)
  
  return insertedUser
}