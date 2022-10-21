import { ICarImageResponseDTO } from "../dtos/ICarImageResponseDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";
import { instanceToInstance } from 'class-transformer'

class ImageMap {
  static toDTO({
    id,
    car,
    car_id,
    image_name,
    image_URL
  }: CarImage): ICarImageResponseDTO {
    const image = instanceToInstance({
      id,
      car,
      car_id,
      image_name,
      image_URL
    })
    
    return image
  }
}

export { ImageMap }