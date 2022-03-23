/* eslint-disable no-useless-constructor */
import { injectable } from 'inversify';

import DatabaseContext from '@Database/database.context';
import Users from '@Database/models/users.model';

@injectable()
export default class UsersRepository {
  constructor(private readonly dbContext: DatabaseContext) {}

  getAll(): Array<Users> {
    return [
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
}
