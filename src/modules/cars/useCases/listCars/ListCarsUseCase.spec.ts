import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({ 
      name: 'Car Available',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4567',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: 'category'
     })

    const cars = await listCarsUseCase.execute({})

    expect(cars.length).toBe(1)
    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({ 
      name: 'Car Available',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4567',
      fine_amount: 60,
      brand: 'Car Brand Test',
      category_id: 'category'
     })

    const cars = await listCarsUseCase.execute({
      brand: 'Car Brand Test',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({ 
      name: 'Car Available Test',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4567',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: 'category'
     })

    const cars = await listCarsUseCase.execute({
      name: 'Car Available Test'
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({ 
      name: 'Car Available',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4567',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: 'category Test'
     })

    const cars = await listCarsUseCase.execute({
      category_id: 'category Test'
    })

    expect(cars).toEqual([car])
  })
})