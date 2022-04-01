import { inject, injectable } from 'inversify';

import IUsers, { Users } from '@Database/models/users.model';
// import UsersRepository from '@Repositories/users.repository';
import UserRespDto from '@Shared/dtos/responses/users.dto';
import IUsersService from '@Interfaces/services/iusers.service';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import KeysMapping from '@Interfaces/interfaces.mapping';
import UsersReqDto from '@Shared/dtos/requests/users.dto';

@injectable()
export default class UsersService implements IUsersService {
  private readonly usersRepository: IUsersRepository;
  constructor(
    @inject(KeysMapping.IUsersRepository) usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  create(userDto: UsersReqDto): UserRespDto {
    const user = this.mapUserModel(userDto);
    return this.mapUserDto(this.usersRepository.create(user));
  }

  getAll(): Array<UserRespDto> {
    const users = this.usersRepository.getAll();
    return users.map((user) => this.mapUserDto(user));
  }

  getById(id: string): UserRespDto | undefined {
    const users = this.usersRepository.getById(id);
    return users ? this.mapUserDto(users) : undefined;
  }

  private mapUserDto(user: IUsers): UserRespDto {
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

  private mapUserModel(userDto: UsersReqDto): IUsers {
    const { firstname, lastname, password, username } = userDto;
    const id = this.getId();
    return new Users({
      id,
      firstname,
      lastname,
      password,
      username,
      created_at: new Date(),
    });
  }

  private getId(): string {
    const id = Math.floor(Math.random() * 100);
    return id.toString();
  }
}
