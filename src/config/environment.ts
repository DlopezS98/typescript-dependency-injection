import { config } from 'dotenv';
import { resolve } from 'path';

export default class Environment {
  constructor() {
    const env = (process.env.NODE_ENV || 'development').trim();
    config({
      path: resolve(__dirname, `${env}.env`)
    });
  }
  
  public get PORT() : number {
    return Number(process.env.PORT) || 3000;
  }
}
