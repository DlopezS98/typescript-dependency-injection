export interface UserRequestDto {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface UserResponseDto {
  id: string;
  username: string;
  fullname: string;
  createdAt: Date;
  updatedAt?: Date;
}