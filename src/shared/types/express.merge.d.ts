import 'express';
import { SettingsKeys, Settings, Locals } from './server.common';

declare module 'express' {
  export interface Request {
    app: Application;
  }

  export interface Application {
    get: (<Key extends SettingsKeys = SettingsKeys>(
      name: Key
    ) => Settings[Key]) &
      IRouterMatcher<this>;
    
    locals: Locals;
  }
}
