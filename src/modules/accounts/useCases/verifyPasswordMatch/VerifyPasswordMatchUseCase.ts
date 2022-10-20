import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { compare } from 'bcryptjs'
import { AppError } from "@shared/errors/AppError"

@injectable()
class VerifyPasswordMatchUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const passwordMatch = await compare(password, user.password)

    return Boolean(passwordMatch)
  } 
}

export { VerifyPasswordMatchUseCase }