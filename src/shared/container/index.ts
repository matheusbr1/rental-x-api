import { container } from 'tsyringe'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRespository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { CarImagesResitory } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository'

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

// IUsersRepository
container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository
)

// ICarsRepository
container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository
)

// ICarImagesRepository
container.registerSingleton<ICarImagesRepository>(
  'CarImagesRepository',
  CarImagesResitory
)
