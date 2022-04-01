import { injectable } from 'inversify';

import DatabaseContext from '@Database/database.context';
import IUsers from '@Database/models/users.model';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';

@injectable()
export default class UsersRepository implements IUsersRepository {
  private readonly users: Array<IUsers>;
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
  
  create(user: IUsers): IUsers {
    const exists = this.users.some(userDb => this.userExists(userDb, user));
    if (exists) throw new Error('The username already exists!');
    
    this.users.push(user);
    return user;
  }

  private userExists(userFromDb: IUsers, newUser: IUsers): boolean {
    const { username: usernameDb } = userFromDb;
    const { username: newUsername } = newUser;

    return usernameDb === newUsername;
  }

  getAll(): Array<IUsers> {
    return this.users;
  }

  getById(id: string): IUsers | undefined {
    return this.users.find(user => user.id === id);
  };
}
