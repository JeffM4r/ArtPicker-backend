import { postUserinDb,checkUserinDb,generateAccessToken } from "../services/authServices.js"
import { Request, Response } from "express"


export async function createUser(req: Request, res: Response) {
  const body = res.locals.user
  
  try {
    const insertedUser = await postUserinDb(body)
  
    return res.status(201).send(insertedUser)

  } catch (error) {

    if (error.name === "userNameAlreadyinUse") {
      return res.sendStatus(409);
    }
    if (error.name === "userEmailAlreadyinUse") {
      return res.sendStatus(409);
    }

    return res.sendStatus(500)
  }
}

export async function createSession(req: Request, res: Response) {
  const body = res.locals.user
  
  try {
    const token = await checkUserinDb(body)
  
    return res.status(201).send(token)

  } catch (error) {

    if (error.name === "failedToSignIn") {
      return res.sendStatus(401);
    }
    return res.sendStatus(500)
  }
}

export async function checkToken(req: Request, res: Response) {
  const {authorization} = req.headers
 
  if(!authorization.includes("Bearer ")){
    return res.sendStatus(401);
  }

  const refresToken = authorization?.replace("Bearer ", "");

  try {
		const newToken = await generateAccessToken(refresToken);
		
		return res.status(201).send(newToken);

	} catch (error) {

		return res.sendStatus(401);
	}
}