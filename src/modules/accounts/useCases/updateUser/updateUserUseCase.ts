import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

@injectable()
class UpdateUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: Partial<ICreateUserDTO>): Promise<void> {

    const user = await this.usersRepository.findById(id)

    const passwordHash = data?.password 
      ? await hash(data.password, 8)
      : user.password

    const updatedUser = { ...user, ...data, password: passwordHash }

    await this.usersRepository.create(updatedUser)
  }
}

export { UpdateUserUseCase }