import 'reflect-metadata';
import { Container } from 'inversify';
import supertest, { Response } from 'supertest';
import { Application as ExpressApp } from 'express';

import DIContainer from '@Src/di.container';
import Application from '@Src/app';
import Environment from '@Src/config/environment';
import { isUserModel, isUserResponseDto } from '@Shared/guards/users.guard';

let app: ExpressApp;
const container: Container = new DIContainer().initialize();
const environment = new Environment();

beforeAll(() => {
  app = new Application(container, environment).initialize();
});

describe('(endpoint): api/v1/users', () => {
  it('Should return json with users\' information', (done: jest.DoneCallback) => {
    const response = supertest(app).get('/api/v1/users').send();
    response
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res: Response) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
        const instanceOfDto = isUserResponseDto(res.body[0]);
        const instanceOfModel = isUserModel(res.body[0]);
        expect(instanceOfDto).toBe(true);
        expect(instanceOfModel).toBe(false);
        expect(res.charset).toBe('utf-8');
        expect(res.header).toHaveProperty('content-type', 'application/json; charset=utf-8');
      })
      .end((err) => (err ? done(err) : done()));
  });
});
