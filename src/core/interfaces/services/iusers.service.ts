import UserDto from '@Shared/Dtos/responses/users.dto';

export default interface IUsersService {
  getAll: () => UserDto[];
  getById: (id: string) => UserDto | undefined;
}