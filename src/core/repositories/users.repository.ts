import { injectable } from 'inversify';

import DatabaseContext from '@Database/database.context';
import Users from '@Database/models/users.model';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';

@injectable()
export default class UsersRepository implements IUsersRepository {
  private readonly users: Array<Users>;
  constructor(private readonly dbContext: DatabaseContext) {
    this.users = [
      {
        id: '1200012',
        firstname: 'Danny',
        lastname: 'Lopez',
        username: 'DlopezS98',
        password: 'Gen3ricP@ssword',
        created_at: new Date(),
      },
      {
        id: '1288120',
        firstname: 'Aldahir',
        lastname: 'Sanchez',
        username: 'DlopezS98',
        password: 'Gen3ricP@ssword',
        created_at: new Date(),
      },
    ];
  }

  getAll(): Array<Users> {
    return this.users;
  }

  getById(id: string): Users | undefined {
    return this.users.find(user => user.id === id);
  };
}
