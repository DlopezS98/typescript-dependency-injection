import JwtPayload from '../models/jwt.payload';

export interface Locals {
  settings: Settings;
}

export interface Settings {
  pkg: PackageJson;
  port: number;
  env: string;
  user?: JwtPayload
}

export type SettingsKeys = keyof Settings;

export interface PackageJson {
  name: string;
  version: string;
  description: string;
  author: string;
  homepage: string;
  repository: {
    type: string;
    url: string;
  }
}
