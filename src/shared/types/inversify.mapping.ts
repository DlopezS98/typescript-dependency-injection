import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IUsersService from '@Interfaces/services/iusers.service';
import IProductsService from '@Interfaces/services/iproducts.service';
import IProductsRepository from '@Interfaces/repositories/iproducts.repository';
import JwtAuthMiddleware from '@Src/middlewares/jwt-authentication';
import { ObjectKeys } from './common.cd';

export interface InterfacesIdentifiers {
  UsersRepository: IUsersRepository;
  UsersService: IUsersService;
  ProductsService: IProductsService,
  ProductsRepository: IProductsRepository;
}

export interface MiddlewaresIdentifiers {
  JwtAuth: JwtAuthMiddleware;
}

export type InterfacesMapping = Record<ObjectKeys<InterfacesIdentifiers>, symbol>;
export type MiddlewaresMapping = Record<ObjectKeys<MiddlewaresIdentifiers>, symbol>;