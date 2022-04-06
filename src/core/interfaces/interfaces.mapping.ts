import { InterfacesMapping } from '@Shared/types/inversify.mapping';

const KeysMapping: InterfacesMapping = {
  IUsersRepository: Symbol.for('IUsersRepository'),
  IUsersService: Symbol.for('IUsersService'),
  IProductsRepository: Symbol.for('IProductsRepository'),
  IProductsService: Symbol.for('IProductsService')
};

export default KeysMapping;