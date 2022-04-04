/* eslint-disable max-classes-per-file */

import HttpStatusCodes from '@Shared/types/http-status-codes';
import { HttpRequestOptions, HttpResponse } from '@Shared/types/common.cd';

export class SuccessResponse<T = Record<string, unknown>> implements HttpResponse<T> {
  statusCode: HttpStatusCodes;
  message = 'Request made successfully!';
  success = true;
  data?: T;

  constructor(options: HttpRequestOptions<T>) {
    const { data, message, statusCode } = options;
    this.statusCode = statusCode ?? HttpStatusCodes.BadRequest;
    this.message = message ?? this.message;
    this.data = data;
  }
}

export class ErrorResponse<T = Record<string, unknown>> implements HttpResponse<T> {
  statusCode: HttpStatusCodes;
  message = 'Unexpected internal server error!';
  success = false;
  data?: T;

  constructor(options: HttpRequestOptions<T>) {
    const { data, message, statusCode } = options;
    this.statusCode = statusCode ?? HttpStatusCodes.BadRequest;
    this.message = message ?? this.message;
    this.data = data;
  }
}
