import { Request, Response, NextFunction } from 'express';

import { HttpResponse } from '@Shared/types/common.cd';
import { ForbbidenException, UnauthorizedException } from '@Shared/models/http-error-exceptions';

type MiddlewareHandler = (
  req: Request,
  res: Response<HttpResponse<unknown>>,
  next: NextFunction
) => void;

const RolesAuth =
  (...roles: string[]): MiddlewareHandler =>
  (
    req: Request,
    res: Response<HttpResponse<unknown>>,
    next: NextFunction
  ): void => {
    try {
      const currentUser = req.app.get('user');
      if(!currentUser) throw new UnauthorizedException('You need to be logged in!');
      
      const hasExpectedRoles = roles.some((role: string) =>
        currentUser.roles.some((userRole: string) => userRole === role)
      );

      if (!hasExpectedRoles)
        throw new ForbbidenException(
          'Ups! You don\'t have enough permissions to request this resource.'
        );

      next();
    } catch (error) {
      next(error);
    }
  };

export default RolesAuth;
