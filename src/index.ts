/* eslint-disable no-console */
import 'reflect-metadata';
import { Container } from 'inversify';
import { getRouteInfo, RouteInfo } from 'inversify-express-utils';
import prettyjson from 'prettyjson';

import './paths';
import Environment from '@Config/environment';
import DIContainer from './di.container';
import Application from './app';

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
      
      return { success: true, message };
    } catch (error: any) {
      return { success: false, message: error };
    }
  }
}

new Startup().initialize().then((resp) => {
  console.info('info: ', resp);
});
