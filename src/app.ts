import {
  urlencoded,
  json,
  Request,
  Response,
  Application as ExpressApp,
} from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import cors from 'cors';
import morgan from 'morgan';
import { Container } from 'inversify';

import '@Controllers/users.controller';
import Environment from '@Config/environment';
import pkg from '../package.json';

export default class Application {
  private readonly server: InversifyExpressServer;
  private readonly environment: Environment;

  constructor(container: Container, environment: Environment) {
    this.server = new InversifyExpressServer(container);
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

      app.get('/', (req: Request, res: Response) => this.index(req, res, app));
      return app;
    });

    return this.server.build();
  }

  private index(req: Request, res: Response, app: ExpressApp): Response {
    return res.status(200).json({
      message: 'Example api',
      name: app.get('pkg').name,
      version: app.get('pkg').version,
      description: app.get('pkg').description,
      author: app.get('pkg').author,
    });
  }
}
