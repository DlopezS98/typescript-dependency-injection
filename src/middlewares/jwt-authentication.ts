import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import Interfaces from '@Interfaces/interfaces.mapping';
import IUsersService from '@Interfaces/services/iusers.service';
import HttpException from '@Src/shared/models/http-error-exception';
import StatusCodes from '@Shared/types/http-status-codes';
import Environment from '@Config/environment';
import JwtPayload from '@Shared/models/jwt.payload';
import { errorGuard } from '@Src/shared/guards/common.guard';
import { HttpResponse } from '@Shared/types/common.cd';
import { UserResponseDto } from '@Src/shared/dtos/users.dto';

@injectable()
export default class JwtAuthMiddleware extends BaseMiddleware {
  @inject(Interfaces.UsersService)
  private readonly usersSevice!: IUsersService;
  public environment: Environment = new Environment();

  public handler(req: Request, res: Response, next: NextFunction): void {
    const rawToken = req.headers.authorization;
    if (!rawToken)
      throw new HttpException({
        message: 'Unauthorized: No token provided',
        statusCode: StatusCodes.Forbidden,
      });

    const token = rawToken.split(' ')[1];
    const payload = this.verifyToken(token);
    const user = this.usersSevice.getById(payload.id);
    if (!user)
      throw new HttpException({
        message: 'User not found',
        statusCode: StatusCodes.NotFound,
      });

    req.app.set('user', this.getJwtPayload(user));
    next();
  }

  private verifyToken(token: string): JwtPayload {
    try {
      return <JwtPayload>jwt.verify(token, this.environment.JWT_SECRET_KEY);
    } catch (error: unknown) {
      const { message, statusCode } = this.jwtErrorHandler(error);
      throw new HttpException({ message, statusCode });
    }
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

  private getJwtPayload(user: UserResponseDto): JwtPayload {
    const { id, username, fullname } = user;
    return { id, username, fullname, email: '01dlopezs98@gmail.com', roles: [] };
  }
}
