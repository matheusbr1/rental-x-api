import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { DayJsDateProvider } from './DateProvider/Implementations/DayJsDateProvider'
import { EtherealMailProvider } from './MailProvider/Implementations/EtherealMailProvider'

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider
)

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
)