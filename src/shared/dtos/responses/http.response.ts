/* eslint-disable max-classes-per-file */

import HttpStatusCodes from '@Shared/types/http-status-codes';

export interface HttpResponse<T> {
  statusCode: HttpStatusCodes;
  message: string;
  success: boolean;
  data?: T;
}

export type HttpRequestOptions<T> = Partial<Omit<HttpResponse<T>, 'success'>>;

export class Success<T = Record<string, unknown>> implements HttpResponse<T> {
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

export class Error<T = Record<string, unknown>> implements HttpResponse<T> {
  statusCode: HttpStatusCodes;
  message = 'There was an error trying to complete the request!';
  success = false;
  data?: T;

  constructor(options: HttpRequestOptions<T>) {
    const { data, message, statusCode } = options;
    this.statusCode = statusCode ?? HttpStatusCodes.BadRequest;
    this.message = message ?? this.message;
    this.data = data;
  }
}
