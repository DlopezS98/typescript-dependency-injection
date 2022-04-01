import { urlencoded, json, Application as ExpressApp } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import cors from 'cors';
import morgan from 'morgan';
import { Container } from 'inversify';

import Environment from '@Config/environment';
import pkg from '../package.json';

// controllers
import '@Controllers/controllers.mapping';

export default class Application {
  private readonly server: InversifyExpressServer;
  private readonly environment: Environment;

  constructor(container: Container, environment: Environment) {
    this.server = new InversifyExpressServer(container, null, {
      rootPath: '/api/v1',
    });
    this.environment = environment;
  }

  public initialize(): ExpressApp {
    this.server.setConfig((app) => {
      // settings
      app.set('port', this.environment.PORT);
      app.set('pkg', pkg);

      // middlewares
      app.use(morgan('dev'));
      app.use(cors());
      app.use(urlencoded({ extended: false }));
      app.use(json());
    });

    return this.server.build();
  }
}
