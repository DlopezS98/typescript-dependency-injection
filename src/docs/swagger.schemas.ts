import { Components } from 'swagger-jsdoc';

const schemas: Components['schemas'] = {
  HttpResponses: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      success: { type: 'boolean' },
      statusCode: { type: 'number' },
      data: { type: 'object' }
    }
  },
  SignInRequest: {
    type: 'object',
    required: ['user', 'password'],
    properties: {
      user: { type: 'string' },
      password: { type: 'string' },
    },
  },
  SignInResponse: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      jwt: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          expiresIn: { type: 'string' },
        },
      },
    },
  },
  SignUpRequest: {
    type: 'object',
    required: ['username', 'email', 'firstname', 'lastname', 'password'],
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      password: { type: 'string' },
    },
  },
  SignUpResponse: {
    $ref: '#/components/schemas/UserResponse',
  },
  UserResponse: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      username: { type: 'string' },
      fullname: { type: 'string' },
      email: { type: 'string' },
      createdAt: { type: 'string' },
      roles: { type: 'array', items: { type: 'string' } },
    },
  },
  UserRequest: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      roles: { type: 'array', items: { type: 'string' } },
    }
  }
};

export default schemas;
