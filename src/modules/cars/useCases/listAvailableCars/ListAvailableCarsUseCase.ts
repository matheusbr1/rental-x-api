import { ICarImageResponseDTO } from "@modules/cars/dtos/ICarImageResponseDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ImageMap } from "@modules/cars/mapper/ImageMap";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

interface UpdatedCar extends Omit<Car, 'images'> {
  images: ICarImageResponseDTO[]
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({ category_id, brand, name }: IRequest): Promise<UpdatedCar[]> {
    const cars = await this.carsRepository.findAvailable(brand, category_id, name)

    const mapped = cars.map(car => ({
      ...car,
      images: car.images.map(image => ImageMap.toDTO(image))
    }))

    return mapped
  }
}

export { ListAvailableCarsUseCase }