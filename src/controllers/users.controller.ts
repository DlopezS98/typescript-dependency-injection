import UserDto from '@Shared/Dtos/responses/users.dto';
import { Response, Request } from 'express';

export default class UsersController {
  public getUsers = (
    req: Request,
    resp: Response<UserDto>
  ): Response<UserDto> =>
    resp.status(200).json({
      id: '12',
      fullname: 'Danny Lopez',
      createdAt: new Date(),
      username: 'DlopezS98',
    });
}
