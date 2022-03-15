import { Repository, getRepository } from 'typeorm';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }
  
  async create(data: ICreateUserDTO): Promise<void> {
    const {
      name,
      username,
      email,
      driver_license,
      password
    } = data

    const user = this.repository.create({
      name,
      username,
      email,
      driver_license,
      password
    })

    await this.repository.save(user)
  }
}

export { UsersRepository }