import { GuardedType, Sentinel } from '../types/common.cd';

export default function typeGuard<T extends Sentinel>(
  value: unknown,
  sentinel: T
): value is GuardedType<T> {
  return typeof value === sentinel;
}

export const errorGuard = (error: unknown): error is Error => {
  const isObject = typeGuard(error, 'object');
  return isObject ? 'message' in error && 'stack' in error : false;
};

export const customObjectGuard = <T>(
  searchProperty: keyof T,
  object: unknown
): object is T => {
  const isObject = typeGuard(object, 'object');
  return isObject ? searchProperty in object : false;
};

export const guardObjectArray = <T>(
  searchProperty: keyof T,
  array: Array<unknown>
): array is Array<T> => {
  const firstelement = array[0];
  const isObject = typeGuard(firstelement, 'object');
  return isObject ? searchProperty in firstelement : false;
};
