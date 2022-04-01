import usersReqDto from '@Shared/dtos/requests/users.dto';
import UserRespDto from '@Shared/dtos/responses/users.dto';

export default interface IUsersService {
  create(user: usersReqDto): UserRespDto;
  getAll(): UserRespDto[];
  getById(id: string): UserRespDto | undefined;
}