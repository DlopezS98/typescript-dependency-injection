/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';

import { customObjectGuard, errorGuard } from '@Src/shared/guards/common.guard';
import HttpException from '@Shared/models/http-error-exceptions';
import { ErrorResponse } from '@Shared/models/http.response';
import { HttpResponse } from '@Shared/types/common.cd';
import StatusCodes from '@Shared/types/http-status-codes';

const ErrorMiddlewareHandler = (
  error: unknown,
  req: Request,
  res: Response<HttpResponse<unknown>>,
  next: NextFunction
): void => {
  if (customObjectGuard<HttpException>('statusCode', error)) {
    res.status(error.statusCode).json(
      new ErrorResponse({
        message: error.message,
        statusCode: error.statusCode,
        data: error.data,
      })
    );

    return next(error);
  }

  if (errorGuard(error)) {
    res.status(StatusCodes.InternalServerError).json(
      new ErrorResponse({
        message: error.message,
        statusCode: StatusCodes.InternalServerError,
        data: error,
      })
    );

    return next(error);
  }

  res.status(StatusCodes.InternalServerError).json(
    new ErrorResponse({
      statusCode: StatusCodes.InternalServerError,
      data: error,
    })
  );

  return next(error);
};

export default ErrorMiddlewareHandler as ErrorRequestHandler;
