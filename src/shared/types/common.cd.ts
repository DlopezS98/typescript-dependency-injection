/* eslint-disable @typescript-eslint/ban-types */
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

export type OptionalKeysOf<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Filter required properties and get only the optional & turn them as required...
export type OptionalKeys<T> = Required<Pick<T, OptionalKeysOf<T>>>;
// Filter optinal properties and get only the required...
export type RequiredKeys<T> = Omit<T, OptionalKeysOf<T>>;
// Create type with a specific optional property 
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
