/* eslint-disable max-classes-per-file */
import { HttpRequestOptions, HttpResponse } from '../types/common.cd';
import HttpStatusCodes from '../types/http-status-codes';

const DefaultErrorMessage = 'Unexpected internal server error!';

export default class HttpException<T = Record<string, unknown>> extends Error implements HttpResponse<T> {
  statusCode: HttpStatusCodes;
  message: string = DefaultErrorMessage;
  success = false;
  data?: T;

  constructor(options: HttpRequestOptions<T> = {}) {
    super(options.message ?? DefaultErrorMessage);
    const { data, message, statusCode } = options;
    this.statusCode = statusCode ?? HttpStatusCodes.InternalServerError;
    this.message = message ?? this.message;
    this.data = data;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, data?: Record<string, unknown>) {
    super({ message, data, statusCode: HttpStatusCodes.BadRequest });
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, data?: Record<string, unknown>) {
    super({ message, data, statusCode: HttpStatusCodes.NotFound });
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, data?: Record<string, unknown>) {
    super({ message, data, statusCode: HttpStatusCodes.Unauthorized });
  }
}