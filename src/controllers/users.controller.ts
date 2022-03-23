import { controller, httpGet } from 'inversify-express-utils';

import UserDto from '@Shared/Dtos/responses/users.dto';
import { Response, Request } from 'express';
import UsersService from '@Services/users.service';

@controller('/api/users')
export default class UsersController {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @httpGet('/')
  public getUsers(
    req: Request,
    resp: Response<Array<UserDto>>
  ): Response<Array<UserDto>> {
    const users = this.usersService.getAll();
    return resp.status(200).json(users);
  }
}
