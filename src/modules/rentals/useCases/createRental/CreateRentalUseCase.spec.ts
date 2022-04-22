import dayjs from 'dayjs'
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayJsDateProvider'

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayJsDateProvider
let createRentalUseCase: CreateRentalUseCase

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayJsDateProvider = new DayJsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    )
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({ 
      car_id: '123', 
      expected_return_date: dayAdd24Hours, 
      user_id: '1234' 
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to created a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({ 
        car_id: '123', 
        expected_return_date: dayAdd24Hours, 
        user_id: '1234' 
      })
  
      await createRentalUseCase.execute({ 
        car_id: '456', 
        expected_return_date: dayAdd24Hours, 
        user_id: '1234' 
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to created a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({ 
        car_id: '123', 
        expected_return_date: dayAdd24Hours, 
        user_id: '1234' 
      })
  
      await createRentalUseCase.execute({ 
        car_id: '123', 
        expected_return_date: dayAdd24Hours, 
        user_id: '5678' 
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to created a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({ 
        car_id: '789', 
        expected_return_date: dayjs().toDate(),
        user_id: '354' 
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})