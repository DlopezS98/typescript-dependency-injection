import Users from '@Database/models/users.model';
import { UserResponseDto } from '../dtos/users.dto';
import typeGuard from './common.guard';

export function isUserResponseDto(user: unknown): user is UserResponseDto {
  const isObject = typeGuard<'object'>(user, 'object');
  return isObject ? 'username' in user && 'fullname' in user : false;
}

export function isUserModel(user: unknown): user is Users {
  const isObject = typeGuard<'object'>(user, 'object');
  return isObject
    ? 'username' in user && 'firstname' in user && 'lastname' in user
    : false;
}