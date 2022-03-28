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