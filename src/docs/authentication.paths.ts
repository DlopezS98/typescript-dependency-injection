import { Paths } from 'swagger-jsdoc';
import swaggerTags from './swagger.tags';

const { Security } = swaggerTags;

const schemas = '#/components/schemas' as const;

const authentication: Paths = {
  '/auth/signin': {
    post: {
      summary: 'user log in',
      tags: [Security.name],
      requestBody: {
        description: 'credentilas to log in. Property "user" could be an email or username',
        required: true,
        content: {
          'application/json': {
            schema: { $ref: `${schemas}/SignInRequest` },
            example: {
              user: '01dlopezs98@gmail.com',
              password: 'Gen3ricP@ssword'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'log in successfully',
          content: {
            'application/json': {
              schema: {
                $ref: `${schemas}/HttpResponses`,
                // overwriting property data...
                properties: {
                  data: {
                    $ref: `${schemas}/SignInResponse`
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/auth/signup': {
    post: {
      summary: 'user registration',
      tags: [Security.name],
      requestBody: {
        description: '',
        required: true,
        content: {
          'application/json': {
            schema: { $ref: `${schemas}/SignUpRequest` }
          }
        }
      },
      responses: {
        200: {
          description: 'success registration',
          content: {
            'application/json': {
              schema: {
                $ref: `${schemas}/HttpResponses`,
                // overwriting property data...
                properties: {
                  data: {
                    $ref: `${schemas}/SignUpResponse`
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default authentication;