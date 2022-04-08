import { UserRequestDto, UserResponseDto } from './users.dto';

export interface SingInRequestDto {
  user: string;
  password: string;
}

export interface SignInResponseDto {
  username: string;
  email: string;
  jwt: {
    token: string;
    expiresIn: string;
  }
}

export type SignUpRequestDto = Omit<UserRequestDto, 'roles'>;
export type SingUpResponseDto = UserResponseDto;