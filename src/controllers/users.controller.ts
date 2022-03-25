import {
  controller,
  httpGet,
  requestParam,
  response
} from 'inversify-express-utils';

import UserDto from '@Shared/Dtos/responses/users.dto';
import { Response, Request } from 'express';
import IUsersService from '@Interfaces/services/iusers.service';
import { inject } from 'inversify';
import KeysMapping from '@Interfaces/interfaces.mapping';
import BaseController from './base.controller';

@controller('/users')
export default class UsersController extends BaseController {
  private readonly usersService: IUsersService;

  constructor(@inject(KeysMapping.IUsersService) usersService: IUsersService) {
    super();
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

  @httpGet('/:id')
  public getById(
    @response() resp: Response<UserDto>,
    @requestParam('id') id: string,
  ): Response<UserDto> {
    const user = this.usersService.getById(id);
    return resp.status(200).json(user);
  };
}
