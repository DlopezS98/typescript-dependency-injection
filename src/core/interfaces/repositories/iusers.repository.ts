import Users from '@Database/models/users.model';

export default interface IUsersRepository {
  getAll: () => Users[];
  getById: (id: string) => Users | undefined;
}