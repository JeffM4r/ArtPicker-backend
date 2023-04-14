import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserIdJWT } from "../config/types.js";

export async function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const {authorization} = req.headers
  
  if(!authorization?.includes("Bearer ")){
    return res.sendStatus(401);
  }

  const accessToken = authorization?.replace("Bearer ", "");

  try {
    const dados = await jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET) as UserIdJWT;
    
    res.locals.user = dados.userId;

    next();
    
  } catch (error) {

    return res.sendStatus(401);
  }
}