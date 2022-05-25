import dayjs from 'dayjs'
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayJsDateProvider'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayJsDateProvider: DayJsDateProvider
let createRentalUseCase: CreateRentalUseCase

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayJsDateProvider = new DayJsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    )
  })

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'car test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 60,
      category_id: '1234',
      brand: 'brand test'
    })

    const rental = await createRentalUseCase.execute({ 
      car_id: car.id, 
      expected_return_date: dayAdd24Hours, 
      user_id: '1234' 
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to created a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
       car_id: '1111',
       expected_return_date: dayAdd24Hours,
       user_id: '1324'
    })

    await expect(
      createRentalUseCase.execute({ 
        car_id: '4564', 
        expected_return_date: dayAdd24Hours, 
        user_id: '1324' 
      })
    ).rejects.toEqual(new AppError('There is a rental in progress for this user'))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      expected_return_date: dayAdd24Hours,
      user_id: '1324'
   })

    await expect(
      createRentalUseCase.execute({ 
        car_id: 'test', 
        expected_return_date: dayAdd24Hours, 
        user_id: '5678' 
      })
    ).rejects.toEqual(new AppError('Car is unavailable'))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'car test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 60,
      category_id: '1234',
      brand: 'brand test'
    })

    await expect(
      createRentalUseCase.execute({ 
        car_id: car.id, 
        expected_return_date: dayjs().toDate(),
        user_id: '354' 
      })
    ).rejects.toEqual(new AppError('Invalid return time'))
  })
})