import { users, profilePictures } from "@prisma/client";
import { postUserinDb, checkUserinDb, generateAccessToken, getUser } from "../services/authServices.js"
import { Request, Response } from "express"
import { SignupBody, SigninBody } from "src/config/types.js";


export async function createUser(req: Request, res: Response): Promise<void> {
  const body: SignupBody = res.locals.user;

  try {
    const insertedUser: users = await postUserinDb(body);
    delete insertedUser.id;

    res.status(201).send(insertedUser);
    return;

  } catch (error) {

    if (error.name === "userNameAlreadyinUse") {
      res.sendStatus(409);
      return;
    };
    if (error.name === "userEmailAlreadyinUse") {
      res.sendStatus(409);
      return;
    };

    res.sendStatus(500)
    return;
  }
}

export async function createSession(req: Request, res: Response): Promise<void> {
  const body: SigninBody = res.locals.user;

  try {
    const token: { refreshToken: string; accessToken: string; } = await checkUserinDb(body);

    res.status(201).send(token);
    return;

  } catch (error) {

    if (error.name === "failedToSignIn") {
      res.sendStatus(401);
      return;
    };
    res.sendStatus(500);
    return;
  }
}

export async function sendUser(req: Request, res: Response): Promise<void> {
  const userId: number = res.locals.user

  try {
    const user: users & { profilePictures: profilePictures[]; } = await getUser(userId);
    delete user.profilePictures[0].pictureSerial
    delete user.profilePictures[0].createdAt
    delete user.password

    res.status(201).send(user);
    return;

  } catch (error) {

    if (error.name === "failedToFindUser") {
      res.sendStatus(404);
      return;
    };
    res.sendStatus(500);
    return;
  }
}

export async function checkToken(req: Request, res: Response): Promise<void> {
  const authorization: string = req.headers.authorization;

  if (!authorization?.includes("Bearer ")) {
    res.sendStatus(401);
    return;
  };

  const refresToken: string = authorization?.replace("Bearer ", "");

  try {
    const newToken: string = await generateAccessToken(refresToken);

    res.status(201).send(newToken);
    return;

  } catch (error) {

    res.sendStatus(401);
    return;
  }
}