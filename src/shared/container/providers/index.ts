import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { DayJsDateProvider } from './DateProvider/Implementations/DayJsDateProvider'
import { EtherealMailProvider } from './MailProvider/Implementations/EtherealMailProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider
)

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
)

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider
)