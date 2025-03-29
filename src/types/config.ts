import { CustomThemes } from '~/types';

export interface Env {
  PROJECT_ID: string;
}

export interface Constants {
  //...
}

export interface Config {
  env: Env;
  constants: Constants;
  customThemes: CustomThemes;
}
