import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { UpdateUserUseCase } from './updateUserUseCase'

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const { id } = request.user
    
    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    await updateUserUseCase.execute(id, data)

    return response.status(204).send()
  }
}

export { UpdateUserController }