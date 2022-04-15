import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

import pkg from '../../package.json';
import schemas from './swagger.schemas';
import authentication from './authentication.paths';
import users from './users.paths';
import swaggerTags, { getTags } from './swagger.tags';

const tags = getTags(swaggerTags);

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.1',
  info: {
    title: 'API Documentation - Swagger UI',
    version: pkg.version,
    description: pkg.description,
    license: {
      name: pkg.license,
    },
    contact: {
      email: pkg.email,
      name: pkg.author,
      url: pkg.author_url,
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'development',
    },
  ],
  tags,
  paths: {
    ...authentication,
    ...users,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'Bearer',
      },
    },
    schemas,
  },
};

const swaggerOptions: OAS3Options = { swaggerDefinition, apis: [] };

export default swaggerJSDoc(swaggerOptions);
