import { Paths } from 'swagger-jsdoc';
import swaggerTags from './swagger.tags';

const schemas = '#/components/schemas' as const;

const users: Paths = {
  '/users': {
    get: {
      summary: 'get list of available users',
      tags: [swaggerTags.Users.name],
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: `${schemas}/UserResponse` },
              },
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  },
};

export default users;
