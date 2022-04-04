import HttpStatusCodes from './http-status-codes';

export type ObjectKeys<T> = keyof T;

export interface TypeofMap {
  string: string;
  number: number;
  boolean: boolean;
  object: object;
  bigint: bigint;
  symbol: symbol;
  undefined: undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  function: Function;
}

export type Sentinel = ObjectKeys<TypeofMap>;
export type GuardedType<T extends Sentinel> = TypeofMap[T];

export interface HttpResponse<T> {
  statusCode: HttpStatusCodes;
  message: string;
  success: boolean;
  data?: T;
}

export type HttpRequestOptions<T> = Partial<Omit<HttpResponse<T>, 'success'>>;