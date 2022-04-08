import 'reflect-metadata';
import { Container } from 'inversify';

import DatabaseContext from '@Database/database.context';
import Interfaces from '@Interfaces/interfaces.mapping';
import Middlewares from '@Middlewares/middlewares.mapping';

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

// Security
import JwtAuthMiddleware from '@Middlewares/jwt-authentication';
import IAuthService from '@Interfaces/services/iauth.service';
import AuthService from '@Services/auth.service';

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
      .bind<IUsersRepository>(Interfaces.UsersRepository)
      .to(UsersRepository);
    this.container
      .bind<IUsersService>(Interfaces.UsersService)
      .to(UsersService);
    this.container
      .bind<IProductsService>(Interfaces.ProductsService)
      .to(ProductsService);
    this.container
      .bind<IProductsRespository>(Interfaces.ProductsRepository)
      .to(ProductsRepository);
    this.container
      .bind<IAuthService>(Interfaces.AuthService)
      .to(AuthService);

    // Middlewares...
    this.container
      .bind<JwtAuthMiddleware>(Middlewares.JwtAuth)
      .to(JwtAuthMiddleware);
    return this.container;
  }
}
