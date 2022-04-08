import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';

import IAuthService from '@Interfaces/services/iauth.service';
import {
  SingInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
} from '@Shared/dtos/auth.dto';
import { UserResponseDto } from '@Shared/dtos/users.dto';
import JwtPayload from '@Shared/models/jwt.payload';
import Interfaces from '@Interfaces/interfaces.mapping';
import IUsersService from '@Interfaces/services/iusers.service';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import HttpException, {
  BadRequestException,
  NotFoundException,
} from '@Shared/models/http-error-exceptions';
import Regexp from '@Src/shared/constants/regexp';
import Environment from '@Src/config/environment';
import IUsers from '@Database/models/users.model';
import { errorGuard } from '@Shared/guards/common.guard';
import StatusCodes from '@Shared/types/http-status-codes';
import { HttpResponse } from '@Shared/types/common.cd';

@injectable()
export default class AuthService implements IAuthService {
  private readonly env: Environment;
  constructor(
    @inject(Interfaces.UsersService)
    private readonly usersService: IUsersService,
    @inject(Interfaces.UsersRepository)
    private readonly usersRepository: IUsersRepository
  ) {
    this.env = new Environment();
  }

  singIn(signInDto: SingInRequestDto): SignInResponseDto {
    const user = this.validateCredentials(signInDto.user, signInDto.password);
    const payload: JwtPayload = this.getJwtPayload(user);
    const expiresIn: string = this.env.JWT_EXPIRES_IN;
    const token: string = jwt.sign(payload, this.env.JWT_SECRET_KEY, {
      expiresIn,
    });

    return {
      email: user.email,
      username: user.username,
      jwt: { token, expiresIn },
    };
  }

  singUp(user: SignUpRequestDto): UserResponseDto {
    return this.usersService.create({ ...user, roles: ['Guest'] });
  }

  verifyToken(token: string): JwtPayload {
    try {
      return <JwtPayload>jwt.verify(token, this.env.JWT_SECRET_KEY);
    } catch (error: unknown) {
      const { message, statusCode } = this.jwtErrorHandler(error);
      throw new HttpException({ message, statusCode });
    }
  }

  getJwtPayload(user: UserResponseDto): JwtPayload {
    const { id, username, fullname, email } = user;
    return { id, username, fullname, email, roles: [] };
  }

  private jwtErrorHandler(
    error: unknown
  ): Pick<HttpResponse<unknown>, 'message' | 'statusCode'> {
    if (errorGuard(error)) {
      if (error.name === 'TokenExpiredError')
        return {
          message: 'The user token has been expired, please sign in again!',
          statusCode: StatusCodes.Unauthorized,
        };

      return {
        message: error.message,
        statusCode: StatusCodes.Unauthorized,
      };
    }

    throw new HttpException();
  }

  private validateCredentials(
    usernameOrEmail: string,
    password: string
  ): UserResponseDto {
    const isEmail: boolean = new Regexp(usernameOrEmail).isEmail();
    const user = this.usersRepository.getByUsernameOrEmail(usernameOrEmail);
    if (!user)
      throw new NotFoundException(
        `The ${isEmail ? 'email' : 'username'} doesn't exists!`
      );

    if (password !== user.password)
      throw new BadRequestException('The password is wrong!');

    return this.mapUserDto(user);
  }

  private mapUserDto(user: IUsers): UserResponseDto {
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
    return { id, username, fullname, email, roles, createdAt, updatedAt };
  }
}
