import { injectable } from 'inversify';

import Users from '@Database/models/users.model';
import UsersRepository from '@Repositories/users.repository';
import UserDto from '@Shared/Dtos/responses/users.dto';

@injectable()
export default class UsersService {
  private readonly usersRepository: UsersRepository;
  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  getAll(): Array<UserDto> {
    const users = this.usersRepository.getAll();
    return users.map(user => this.mapUserDto(user));
  }

  private mapUserDto(user: Users): UserDto {
    const {
      id,
      username,
      firstname,
      lastname,
      created_at: createdAt,
      updated_at: updatedAt,
    } = user;
    const fullname = `${firstname} ${lastname}`;
    return { id, username, fullname, createdAt, updatedAt };
  }
}
