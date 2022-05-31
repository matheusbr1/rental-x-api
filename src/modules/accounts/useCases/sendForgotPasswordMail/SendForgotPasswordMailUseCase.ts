import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from 'uuid'

@injectable()
class SendForgotPasswordMailUseCase {
  constructor (
    @inject('UserRepository')
    private usersRepository: IUsersRepository, 
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute (email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Users does not exists')
    }

    const token = uuidv4()

    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    })

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para o reset é ${token}`
    )
  }
}

export { SendForgotPasswordMailUseCase }