import { InterfacesMapping } from '@Shared/types/inversify.mapping';

const KeysMapping: InterfacesMapping = {
  IUsersRepository: Symbol.for('IUsersRepository'),
  IUsersService: Symbol.for('IUsersService')
};

export default KeysMapping;