import 'reflect-metadata';
import { Container } from 'inversify';

import DatabaseContext from '@Database/database.context';
import KeysMapping from '@Interfaces/interfaces.mapping';

// users...
import UsersRepository from '@Repositories/users.repository';
import UsersService from '@Services/users.service';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IUsersService from '@Interfaces/services/iusers.service';

// products
import IProductsService from '@Interfaces/services/iproducts.service';
import ProductsService from '@Services/products.service';
import IProductsRespository from '@Interfaces/repositories/iproducts.repository';
import ProductsRepository from '@Repositories/products.repository';

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
    this.container
      .bind<IProductsService>(KeysMapping.IProductsService)
      .to(ProductsService);
    this.container
      .bind<IProductsRespository>(KeysMapping.IProductsRepository)
      .to(ProductsRepository);
    return this.container;
  }
}
