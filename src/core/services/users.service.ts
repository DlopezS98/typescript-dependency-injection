import { inject, injectable } from 'inversify';

import IUsers, { Users } from '@Database/models/users.model';
import {
  UserRequestDto as UsersReqDto,
  UserResponseDto as UserRespDto,
} from '@Shared/dtos/users.dto';
import IUsersService from '@Interfaces/services/iusers.service';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import Interfaces from '@Interfaces/interfaces.mapping';
import HttpException from '@Shared/models/http-error-exceptions';
import StatusCodes from '@Shared/types/http-status-codes';

@injectable()
export default class UsersService implements IUsersService {
  private readonly usersRepository: IUsersRepository;
  constructor(
    @inject(Interfaces.UsersRepository) usersRepository: IUsersRepository
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

  getById(id: string): UserRespDto {
    const user = this.usersRepository.getById(id);
    if (!user)
      throw new HttpException({
        message: 'The user doesn\'t exists!',
        statusCode: StatusCodes.NotFound,
      });

    return this.mapUserDto(user);
  }

  getByUsernameOrEmail(usernameOrEmail: string): UserRespDto {
    const user = this.usersRepository.getByUsernameOrEmail(usernameOrEmail);
    if (!user)
      throw new HttpException({
        message: 'The user doesn\'t exists!',
        statusCode: StatusCodes.NotFound,
      });

    return this.mapUserDto(user);
  }

  private mapUserDto(user: IUsers): UserRespDto {
    const {
      id,
      username,
      firstname,
      lastname,
      email,
      roles,
      created_at: createdAt,
      updated_at: updatedAt,
    } = user;
    const fullname = `${firstname} ${lastname}`;
    return { id, username, fullname, email, createdAt, updatedAt, roles };
  }

  private mapUserModel(userDto: UsersReqDto): IUsers {
    const { firstname, lastname, password, username, email, roles } = userDto;
    const id = this.getId();
    return new Users({
      id,
      firstname,
      lastname,
      email,
      roles,
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
