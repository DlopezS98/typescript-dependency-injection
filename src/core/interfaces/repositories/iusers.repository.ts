import IUsers from '@Database/models/users.model';

export default interface IUsersRepository {
  create(user: IUsers): IUsers;
  getAll(): IUsers[];
  getById: (id: string) => IUsers | undefined;
  getByUsernameOrEmail(user: string): IUsers | undefined;
}