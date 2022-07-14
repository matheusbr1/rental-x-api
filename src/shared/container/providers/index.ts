import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { DayJsDateProvider } from './DateProvider/Implementations/DayJsDateProvider'
import { EtherealMailProvider } from './MailProvider/Implementations/EtherealMailProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider'

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider
)

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
)

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk]
)