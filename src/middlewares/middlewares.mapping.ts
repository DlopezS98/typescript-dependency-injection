import { MiddlewaresMapping } from '@Shared/types/inversify.mapping';

// only for middlewares that inherit from BaseMiddleware ('inversify-express-utils')
const Middlewares: MiddlewaresMapping = {
  JwtAuth: Symbol.for('JwtMiddleware')
};

export default Middlewares;