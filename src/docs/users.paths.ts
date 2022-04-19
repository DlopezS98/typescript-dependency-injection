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
    post: {
      summary: 'Create a new user',
      tags: [swaggerTags.Users.name],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: `${schemas}/UserRequest`
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Created',
          content: {
            'application/json': {
              schema: {
                $ref: `${schemas}/HttpResponses`,
                properties: {
                  data: {
                    $ref: `${schemas}/UserResponse`
                  }
                }
              }
            }
          }
        }
      },
      security: [{ bearerAuth: [] }]
    }
  },
  '/users/:id' : {
    get: {
      summary: 'Get a single user by id',
      tags: [swaggerTags.Users.name],
      responses: {
        200: {
          description: 'Ok',
          content: {
            'application/json': {
              schema: {
                $ref: `${schemas}/UserResponse`
              }
            }
          }
        }
      },
      security: [{ bearerAuth: [] }],
    }
  },
};

export default users;
