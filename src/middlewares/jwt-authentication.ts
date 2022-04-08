import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';

import Interfaces from '@Interfaces/interfaces.mapping';
import IUsersService from '@Interfaces/services/iusers.service';
import HttpException, { NotFoundException } from '@Src/shared/models/http-error-exceptions';
import StatusCodes from '@Shared/types/http-status-codes';
import IAuthService from '@Interfaces/services/iauth.service';

@injectable()
export default class JwtAuthMiddleware extends BaseMiddleware {
  @inject(Interfaces.AuthService)
  private readonly authService!: IAuthService;
  @inject(Interfaces.UsersService)
  private readonly usersSevice!: IUsersService;

  public handler(req: Request, res: Response, next: NextFunction): void {
    const rawToken = req.headers.authorization;
    if (!rawToken)
      throw new HttpException({
        message: 'Unauthorized: No token provided',
        statusCode: StatusCodes.Forbidden,
      });

    const token = rawToken.split(' ')[1];
    const payload = this.authService.verifyToken(token);
    const user = this.usersSevice.getById(payload.id);
    if (!user)
      throw new NotFoundException('User Not Found');

    req.app.set('user', this.authService.getJwtPayload(user));
    next();
  }
}
