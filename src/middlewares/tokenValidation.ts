import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserIdJWT } from "../config/types.js";

export async function tokenValidation(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authorization: string = req.headers.authorization

  if (!authorization?.includes("Bearer ")) {
    res.sendStatus(401);
    return;
  }

  const accessToken: string = authorization?.replace("Bearer ", "");

  try {
    const dados: UserIdJWT = await jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET) as UserIdJWT;

    res.locals.user = dados.userId;

    next();

  } catch (error) {

    res.sendStatus(401);
    return;
  }
}