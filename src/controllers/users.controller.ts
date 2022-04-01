import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
  response,
} from 'inversify-express-utils';

import UserRespDto from '@Shared/Dtos/responses/users.dto';
import { Response, Request } from 'express';
import IUsersService from '@Interfaces/services/iusers.service';
import { inject } from 'inversify';
import KeysMapping from '@Interfaces/interfaces.mapping';
import { Success } from '@Shared/Dtos/responses/http.response';
import UserReqDto from '@Shared/Dtos/requests/users.dto';
import StatusCodes from '@Shared/types/http-status-codes';
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
    resp: Response<Array<UserRespDto>>
  ): Response<Array<UserRespDto>> {
    const users = this.usersService.getAll();
    return resp.status(StatusCodes.Ok).json(users);
  }

  @httpGet('/:id')
  public getById(
    @response() resp: Response<UserRespDto>,
    @requestParam('id') id: string
  ): Response<UserRespDto> {
    const user = this.usersService.getById(id);
    return resp.status(StatusCodes.Ok).json(user);
  }

  @httpPost('/')
  public create(
    @requestBody() user: UserReqDto,
    @response() resp: Response<Success<UserRespDto>>
  ): Response<Success<UserRespDto>> {
    const userResponse = this.usersService.create(user);
    const successResponse = new Success<UserRespDto>({
      data: userResponse,
      message: 'User created successfully!',
      statusCode: StatusCodes.Ok,
    });
    return resp.status(StatusCodes.Ok).json(successResponse);
  }
}
