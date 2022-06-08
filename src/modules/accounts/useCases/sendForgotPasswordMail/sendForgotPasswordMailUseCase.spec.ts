import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayJsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayJsDateProvider
let mailProvider: MailProviderInMemory

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayJsDateProvider()
    mailProvider = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail")

    const user  = {
      driver_license: "817845",
      email: "raruju@juk.wf",
      name: "Inez Ryan",
      password: "12345",
    }

    await usersRepositoryInMemory.create(user)

    await sendForgotPasswordMailUseCase.execute(user.email)

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("kafle@dupmihul.es")
    ).rejects.toEqual(new AppError('User does not exists'))
  })

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create")

    const user  = {
      driver_license: "0605021",
      email: "vepa@igkaho.il",
      name: "Victor Marsh",
      password: "12345",
    }

    await usersRepositoryInMemory.create(user)

    await sendForgotPasswordMailUseCase.execute(user.email)

    expect(generateTokenMail).toBeCalled()
  })
})