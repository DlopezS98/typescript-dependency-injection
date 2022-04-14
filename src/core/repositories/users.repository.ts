import { injectable } from 'inversify';

import DatabaseContext from '@Database/database.context';
import IUsers from '@Database/models/users.model';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import HttpStatusCodes from '@Shared/types/http-status-codes';
import HttpException from '@Shared/models/http-error-exceptions';
import { ObjectKeys } from '@Src/shared/types/common.cd';
import Regexp from '@Shared/constants/regexp';

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
        email: '01dlopezs98@gmail.com',
        roles: ['Admin'],
        password: 'Gen3ricP@ssword',
        created_at: new Date(),
      },
      {
        id: '1288120',
        firstname: 'Aldahir',
        lastname: 'Sanchez',
        username: '01DlopezS98',
        roles: ['Guest'],
        email: 'lopezsanchezdannyaldahir@gmail.com',
        password: 'Gen3ricP@ssword',
        created_at: new Date(),
      },
    ];
  }

  create(user: IUsers): IUsers {
    const [exists, message] = this.userExists(user);
    if (exists)
      throw new HttpException({
        message,
        data: { username: user.username, email: user.email },
        statusCode: HttpStatusCodes.BadRequest,
      });

    this.users.push(user);
    return user;
  }

  private userExists(user: IUsers): [boolean, string] {
    const { username, email } = user;
    const usernameExists = this.users.some(
      (userDb) => userDb.username.toUpperCase() === username.toUpperCase()
    );
    if (usernameExists) return [true, 'The username already exists!'];

    const emailExists = this.users.some(
      (userDb) => userDb.email.toUpperCase() === email.toUpperCase()
    );
    if (emailExists) return [true, 'The email already exists'];

    return [false, 'The user doesn\'t exists'];
  }

  getAll(): Array<IUsers> {
    return this.users;
  }

  getById(id: string): IUsers | undefined {
    return this.users.find((user) => user.id === id);
  }

  getByUsernameOrEmail(user: string): IUsers | undefined {
    const isEmail = new Regexp(user).isEmail();
    const key: ObjectKeys<IUsers> = isEmail ? 'email' : 'username';
    return this.users.find(
      (_user) => _user[key].toUpperCase().trim() === user.toUpperCase().trim()
    );
  }
}
