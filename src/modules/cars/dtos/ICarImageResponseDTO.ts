interface ICarImageResponseDTO {
  id: string
  car_id: string
  image_name: string
  image_URL(): string
}

export { ICarImageResponseDTO }