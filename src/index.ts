/* eslint-disable import/order */
/* eslint-disable no-console */
/* Paths & container must be at the beginning to load
  the relative paths & metadata for inversify */
import './paths';
import DIContainer from './di.container';

import { Container } from 'inversify';
import { getRouteInfo, RouteInfo } from 'inversify-express-utils';
import prettyjson from 'prettyjson';

import Environment from '@Config/environment';
import Application from './app';
import { errorGuard } from '@Shared/guards/common.guard';

export default class Startup {
  private readonly enviroment: Environment;
  private readonly application: Application;
  private readonly container: Container;

  constructor() {
    this.container = new DIContainer().initialize();
    this.enviroment = new Environment();
    this.application = new Application(this.container, this.enviroment);
  }

  public async initialize(): Promise<{ success: boolean; message: string }> {
    try {
      const app = this.application.initialize();
      const routes: RouteInfo[] = getRouteInfo(this.container);
      const message = `Server listening on port: ${app.get('port')}`;
      await app.listen(app.get('port'));

      console.log(prettyjson.render({ routes }));
      console.log(`environment: ${app.get('env')}`);

      return { success: true, message };
    } catch (error: unknown) {
      return {
        success: false,
        message: errorGuard(error)
          ? error.message
          : 'Unexpected error while trying to connect with the server...',
      };
    }
  }
}

new Startup().initialize().then((resp) => {
  console.info('info: ', resp);
});
