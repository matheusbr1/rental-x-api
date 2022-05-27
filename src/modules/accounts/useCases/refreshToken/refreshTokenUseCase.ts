import auth from '@config/auth'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { sign, verify } from 'jsonwebtoken'
import { inject } from 'tsyringe'

interface IPayload {
  sub: string
  email: string
}

class RefreshTokenUseCase {
  constructor (
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute (token: string): Promise<string> {
    const decode = verify(token, auth.secret_refresh_token) as IPayload

    const { sub: user_id, email } = decode

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

    if(!userToken) {
      throw new AppError("Refresh Token does not exists")
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    )

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }