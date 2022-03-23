import { Container } from 'inversify';

import DatabaseContext from '@Database/database.context';
import UsersRepository from '@Repositories/users.repository';
import UsersService from '@Services/users.service';

export default class DIContainer {
  private readonly container: Container;
  constructor() {
    this.container = new Container({
      defaultScope: 'Singleton'
    });
  }

  public initialize(): Container {
    this.container.bind(DatabaseContext).toSelf();
    this.container.bind(UsersRepository).toSelf();
    this.container.bind(UsersService).toSelf();
    return this.container;
  }
}