import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js"
import postRepository from "../repositories/postRepository.js";
import { images, users, profilePictures } from "@prisma/client";
import { PostBody } from "src/config/types.js";

export async function postImageinDb(body: PostBody, userId: number): Promise<images> {

  const checkUser: users = await postRepository.findUserById(userId)
  if (!checkUser) {
    throw {
      name: "UserIdInvalid",
      message: "user not found",
    };
  }

  const uploadedImage: UploadApiResponse = await cloudinary.uploader.upload(body.image, {
    upload_preset: "artPicker"
  });

  const insertPost: images = await postRepository.insertPost(body, userId, uploadedImage.url, uploadedImage.public_id)

  return insertPost
}

export async function getAllPosts(): Promise<images[]> {

  const posts: images[] = await postRepository.getPosts()
  if (!posts) {
    throw {
      name: "PostsNotFound",
      message: "there is no posts",
    };
  }

  return posts
}

export async function getPostbyId(postId: number): Promise<images & { users: users & { profilePictures: profilePictures[]; }; }> {

  const post: images & { users: users & { profilePictures: profilePictures[]; }; } = await postRepository.getPost(postId)
  if (!post) {
    throw {
      name: "PostNotFound",
      message: "could not find this post",
    };
  }

  return post
}