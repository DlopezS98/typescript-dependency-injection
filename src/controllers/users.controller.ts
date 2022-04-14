import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Response, Request } from 'express';

import {
  UserResponseDto as UserRespDto,
  UserRequestDto as UserReqDto,
} from '@Shared/dtos/users.dto';
import IUsersService from '@Interfaces/services/iusers.service';
import Interfaces from '@Interfaces/interfaces.mapping';
import { SuccessResponse } from '@Shared/models/http.response';
import StatusCodes from '@Shared/types/http-status-codes';
import { HttpResponse } from '@Shared/types/common.cd';
import Middlewares from '@Middlewares/middlewares.mapping';
import RolesAuth from '@Middlewares/roles.middleware';
import BaseController from './base.controller';

@controller('/users', Middlewares.JwtAuth, RolesAuth('Admin'))
export default class UsersController extends BaseController {
  private readonly usersService: IUsersService;

  constructor(@inject(Interfaces.UsersService) usersService: IUsersService) {
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
    @response() resp: Response<HttpResponse<UserRespDto>>
  ): Response<HttpResponse<UserRespDto>> {
    const userResponse = this.usersService.create(user);
    const successResponse = new SuccessResponse<UserRespDto>({
      data: userResponse,
      message: 'User created successfully!',
      statusCode: StatusCodes.Ok,
    });
    return resp.status(StatusCodes.Ok).json(successResponse);
  }
}
