import { inject, injectable } from 'inversify';

import Users from '@Database/models/users.model';
// import UsersRepository from '@Repositories/users.repository';
import UserDto from '@Shared/Dtos/responses/users.dto';
import IUsersService from '@Interfaces/services/iusers.service';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import KeysMapping from '@Interfaces/interfaces.mapping';

@injectable()
export default class UsersService implements IUsersService {
  private readonly usersRepository: IUsersRepository;
  constructor(@inject(KeysMapping.IUsersRepository) usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  getAll(): Array<UserDto> {
    const users = this.usersRepository.getAll();
    return users.map(user => this.mapUserDto(user));
  }

  getById(id: string): UserDto | undefined {
    const users = this.usersRepository.getById(id);
    return users ? this.mapUserDto(users) : undefined;
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