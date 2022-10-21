import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ImageMap } from "@modules/cars/mapper/ImageMap";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(brand, category_id, name)

    const mapped = cars.map(car => ({
      ...car,
      images: car.images.map(image => ImageMap.toDTO(image))
    })) as any

    return mapped
  }
}

export { ListAvailableCarsUseCase }