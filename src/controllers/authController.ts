import { postUserinDb, checkUserinDb, generateAccessToken } from "../services/authServices.js"
import { Request, Response } from "express"
import { SignupBody, SigninBody } from "src/config/types.js";


export async function createUser(req: Request, res: Response): Promise<void> {
  const body: SignupBody = res.locals.user;

  try {
    const insertedUser = await postUserinDb(body);
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
    const token = await checkUserinDb(body);

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

export async function checkToken(req: Request, res: Response): Promise<void> {
  const authorization:string = req.headers.authorization;

  if (!authorization?.includes("Bearer ")) {
    res.sendStatus(401);
    return;
  };

  const refresToken = authorization?.replace("Bearer ", "");

  try {
    const newToken = await generateAccessToken(refresToken);

    res.status(201).send(newToken);
    return;

  } catch (error) {

    res.sendStatus(401);
    return;
  }
}