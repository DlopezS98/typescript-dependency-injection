import { urlencoded, json, Application as ExpressApp } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import cors from 'cors';
import morgan from 'morgan';
import { Container } from 'inversify';
import SwaggerUI from 'swagger-ui-express';

import Environment from '@Config/environment';
import ErrorMiddlewareHandler from '@Middlewares/global-error-handler';
import pkg from '../package.json';
import SwaggerDocsSetup from './docs/swagger.docs';

// controllers
import '@Controllers/controllers.mapping';

export default class Application {
  private readonly server: InversifyExpressServer;
  private readonly environment: Environment;
  private readonly rootPath = '/api/v1';

  constructor(container: Container, environment: Environment) {
    this.server = new InversifyExpressServer(container, null, {
      rootPath: this.rootPath,
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

      // swagger docs...
      app.use(
        `${this.rootPath}/docs`,
        SwaggerUI.serve,
        SwaggerUI.setup(SwaggerDocsSetup)
      );
    });

    this.server.setErrorConfig((app) => {
      // Global error handling
      app.use(ErrorMiddlewareHandler);
    });

    return this.server.build();
  }
}
