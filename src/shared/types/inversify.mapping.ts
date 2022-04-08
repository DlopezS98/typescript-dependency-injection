import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IUsersService from '@Interfaces/services/iusers.service';
import IProductsService from '@Interfaces/services/iproducts.service';
import IProductsRepository from '@Interfaces/repositories/iproducts.repository';
import IAuthService from '@Interfaces/services/iauth.service';
import JwtAuthMiddleware from '@Middlewares/jwt-authentication';
import { ObjectKeys } from './common.cd';

export interface InterfacesIdentifiers {
  UsersRepository: IUsersRepository;
  UsersService: IUsersService;
  ProductsService: IProductsService,
  ProductsRepository: IProductsRepository;
  AuthService: IAuthService;
}

export interface MiddlewaresIdentifiers {
  JwtAuth: JwtAuthMiddleware;
}

export type InterfacesMapping = Record<ObjectKeys<InterfacesIdentifiers>, symbol>;
export type MiddlewaresMapping = Record<ObjectKeys<MiddlewaresIdentifiers>, symbol>;