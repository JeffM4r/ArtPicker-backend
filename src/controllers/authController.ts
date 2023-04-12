import { postUserinDb,checkUserinDb } from "../services/authServices.js"

export async function createUser(req, res) {
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

export async function createSession(req, res) {
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