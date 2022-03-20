export default interface UserDto {
  id: string;
  username: string;
  fullname: string;
  createdAt: Date;
  updatedAt?: Date;
}