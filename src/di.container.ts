import { Container } from 'inversify';

import DatabaseContext from '@Database/database.context';
import UsersRepository from '@Repositories/users.repository';
import UsersService from '@Services/users.service';
import KeysMapping from '@Interfaces/interfaces.mapping';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IUsersService from '@Interfaces/services/iusers.service';

export default class DIContainer {
  private readonly container: Container;
  constructor() {
    this.container = new Container({
      defaultScope: 'Singleton',
    });
  }

  public initialize(): Container {
    this.container.bind(DatabaseContext).toSelf();
    this.container
      .bind<IUsersRepository>(KeysMapping.IUsersRepository)
      .to(UsersRepository);
    this.container
      .bind<IUsersService>(KeysMapping.IUsersService)
      .to(UsersService);
    return this.container;
  }
}
