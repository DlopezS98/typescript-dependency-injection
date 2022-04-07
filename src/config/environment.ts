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

  public get JWT_SECRET_KEY(): string {
    return process.env.JWT_SECRET_KEY || '57d2857e-7c96-5caf-985e-47e1b68ba3b9';
  }
}
