import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IUsersService from '@Interfaces/services/iusers.service';
import IProductsService from '@Interfaces/services/iproducts.service';
import IProductsRepository from '@Interfaces/repositories/iproducts.repository';

export interface InterfacesIdentifiers {
  IUsersRepository: IUsersRepository;
  IUsersService: IUsersService;
  IProductsService: IProductsService,
  IProductsRepository: IProductsRepository;
}

export type InterfacesMapping = Record<keyof InterfacesIdentifiers, symbol>;