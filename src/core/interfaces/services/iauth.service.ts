import {
  SignInResponseDto,
  SignUpRequestDto,
  SingInRequestDto,
  SingUpResponseDto,
} from '@Shared/dtos/auth.dto';
import JwtPayload from '@Shared/models/jwt.payload';
import { UserResponseDto } from '@Shared/dtos/users.dto';

export default interface IAuthService {
  singIn(user: SingInRequestDto): SignInResponseDto;
  singUp(user: SignUpRequestDto): SingUpResponseDto;
  verifyToken(token: string): JwtPayload;
  getJwtPayload(user: UserResponseDto): JwtPayload;
}
