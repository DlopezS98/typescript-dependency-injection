export default interface UserResponseDto {
  id: string;
  username: string;
  fullname: string;
  createdAt: Date;
  updatedAt?: Date;
}