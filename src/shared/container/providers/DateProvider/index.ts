import { container } from 'tsyringe'
import { IDateProvider } from './IDateProvider'
import { DayJsDateProvider } from './Implementations/DayJsDateProvider'

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider
)