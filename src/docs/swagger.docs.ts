import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

import pkg from '../../package.json';

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
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'Bearer',
      },
    },
  },
};

const swaggerOptions: OAS3Options = { swaggerDefinition, apis: [] };

export default swaggerJSDoc(swaggerOptions);
