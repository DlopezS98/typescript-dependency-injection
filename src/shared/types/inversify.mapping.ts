import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IUsersService from '@Interfaces/services/iusers.service';

export interface InterfacesIdentifiers {
  IUsersRepository: IUsersRepository;
  IUsersService: IUsersService;
}

export type InterfacesMapping = Record<keyof InterfacesIdentifiers, symbol>;