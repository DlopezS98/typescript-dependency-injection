import usersReqDto from '@Shared/Dtos/requests/users.dto';
import UserRespDto from '@Shared/Dtos/responses/users.dto';

export default interface IUsersService {
  create(user: usersReqDto): UserRespDto;
  getAll(): UserRespDto[];
  getById(id: string): UserRespDto | undefined;
}