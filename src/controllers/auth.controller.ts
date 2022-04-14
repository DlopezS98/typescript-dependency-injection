import { inject } from 'inversify';
import { controller, httpPost, requestBody } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/lib/results';

import {
  SingInRequestDto as SignInReqDto,
  SignInResponseDto as SignInResDto,
  SignUpRequestDto as SingUpReqDto,
  SingUpResponseDto as SignUpResDto
} from '@Shared/dtos/auth.dto';
import Interfaces from '@Interfaces/interfaces.mapping';
import IAuthService from '@Interfaces/services/iauth.service';
import { SuccessResponse } from '@Shared/models/http.response';
import StatusCodes from '@Shared/types/http-status-codes';
import BaseController from './base.controller';

@controller('/auth')
export default class AuthController extends BaseController {
  constructor(
    @inject(Interfaces.AuthService) private readonly authService: IAuthService
  ) {
    super();
  }

  @httpPost('/signin')
  SignIn(
    @requestBody() body: SignInReqDto
  ): JsonResult {
    const singInResponse: SignInResDto = this.authService.singIn(body);
    const success = new SuccessResponse<SignInResDto>({
      message: 'You\'re logged in successfully!',
      statusCode: StatusCodes.Ok,
      data: singInResponse
    });

    return this.json(success, StatusCodes.Ok);
  }

  @httpPost('/signup')
  SignUp(
    @requestBody() body: SingUpReqDto
  ): JsonResult {
    const singUpResponse: SignUpResDto = this.authService.singUp(body);
    const success = new SuccessResponse<SignUpResDto>({
      message: 'you has been registered successfully!',
      statusCode: StatusCodes.Ok,
      data: singUpResponse
    });

    return this.json(success, StatusCodes.Ok);
  }
}
