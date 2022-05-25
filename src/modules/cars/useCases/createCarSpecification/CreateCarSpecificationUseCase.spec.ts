import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase"
import { AppError } from "@shared/errors/AppError"

let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory
let createCarSpecificationUseCase: CreateCarSpecificationUseCase

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    )
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Available',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4567',
      fine_amount: 60,
      brand: 'Brand Car',
      category_id: 'category'
    })

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Test',
      description: 'Test'
    })
    
    const specifications_id = [specification.id]

    const specifications_cars = await createCarSpecificationUseCase.execute({ 
      car_id: car.id, 
      specifications_id 
    })

    expect(specifications_cars).toHaveProperty('specifications')
    expect(specifications_cars.specifications.length).toBe(1)
  })

  it('should not be able to add a new specification to a non-existent car', async () => {
    const car_id  = '1234'
    const specifications_id = ['5546']

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError('Car does not exists'))
  })
})