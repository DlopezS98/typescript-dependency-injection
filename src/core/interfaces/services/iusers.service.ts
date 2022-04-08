import {
  UserRequestDto as usersReqDto,
  UserResponseDto as UserRespDto,
} from '@Shared/dtos/users.dto';

export default interface IUsersService {
  create(user: usersReqDto): UserRespDto;
  getAll(): UserRespDto[];
  getById(id: string): UserRespDto;
  getByUsernameOrEmail(user: string): UserRespDto;
}
