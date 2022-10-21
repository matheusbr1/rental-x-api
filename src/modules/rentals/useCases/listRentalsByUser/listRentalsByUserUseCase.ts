import { ImageMap } from "@modules/cars/mapper/ImageMap";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUser(user_id)

    const mapped = rentals.map(rental => ({
      ...rental,
      car: {
        ...rental.car,
        images: rental.car.images.map(image => ImageMap.toDTO(image))
      } 
    })) as any

    return mapped
  }
}

export { ListRentalsByUserUseCase }