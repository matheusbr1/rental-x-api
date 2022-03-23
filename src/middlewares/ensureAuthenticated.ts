import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error("Token missing")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, 'f5ee2251a2d7c1defe64c9bad2d45493')

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(user_id as string)

    if(!user) {
      throw new Error("User does not exists")
    }

    next()
  } catch (error) {
    throw new Error("Invalid token")
  }
}