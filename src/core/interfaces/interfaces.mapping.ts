import { InterfacesMapping } from '@Shared/types/inversify.mapping';

const Interfaces: InterfacesMapping = {
  UsersRepository: Symbol.for('IUsersRepository'),
  UsersService: Symbol.for('IUsersService'),
  ProductsRepository: Symbol.for('IProductsRepository'),
  ProductsService: Symbol.for('IProductsService'),
  AuthService: Symbol.for('IAuthService')
};

export default Interfaces;