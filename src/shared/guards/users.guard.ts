import Users from '@Database/models/users.model';
import UserRespDto from '../dtos/responses/users.dto';
import typeGuard from './common';

export function isUserResponseDto(user: unknown): user is UserRespDto {
  const isObject = typeGuard<'object'>(user, 'object');
  return isObject ? 'username' in user && 'fullname' in user : false;
}

export function isUserModel(user: unknown): user is Users {
  const isObject = typeGuard<'object'>(user, 'object');
  return isObject
    ? 'username' in user && 'firstname' in user && 'lastname' in user
    : false;
}