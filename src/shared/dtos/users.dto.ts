interface BaseUserDto {
  username: string;
  email: string;
  roles: Array<string>;
}

export interface UserRequestDto extends BaseUserDto {
  firstname: string;
  lastname: string;
  password: string;
}

export interface UserResponseDto extends BaseUserDto {
  id: string;
  fullname: string;
  createdAt: Date;
  updatedAt?: Date;
}
