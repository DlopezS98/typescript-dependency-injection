import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';

import BaseController from './base.controller';

@controller('/')
export default class HomeController extends BaseController {
  @httpGet('')
  public index(req: Request, res: Response): Response {
    const { app } = req;

    return res.status(200).json({
      message: 'Example api',
      name: app.get('pkg').name,
      version: app.get('pkg').version,
      description: app.get('pkg').description,
      author: app.get('pkg').author,
    });
  }
}
