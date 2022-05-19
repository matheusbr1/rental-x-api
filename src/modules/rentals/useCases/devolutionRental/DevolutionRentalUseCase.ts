import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string // rental id
  user_id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('rentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('carsRepository')
    private carsRepository: ICarsRepository,
    @inject('dateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest) : Promise<Rental>{
    const rental = await this.rentalsRepository.findById(id)
    const minimum_daily = 1
    const car = await this.carsRepository.findById(id)

    if (!rental) {
      throw new AppError('rental does not exists') 
    }

    // Verificar o tempo de aluguel
    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow
    )

    if (daily <= 0) {
      daily = minimum_daily
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    )

    let total = 0

    if(delay > 0) {
      const calculate_fine = daily * car.fine_amount
      total = calculate_fine
    }

    total += daily * car.daily_rate

    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalsRepository.create(rental)

    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}

export { DevolutionRentalUseCase }