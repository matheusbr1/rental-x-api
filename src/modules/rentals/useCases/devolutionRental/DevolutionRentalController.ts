import { container } from "tsyringe"
import { Request, Response } from 'express'
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase"

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body

    const { id: user_id } = request.user

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

    await devolutionRentalUseCase.execute({ id, user_id })

    return response.status(200).send()
  }
}

export { DevolutionRentalController }