import { CustomThemes } from '~/types';

export interface Env {
  PROJECT_ID: string;
}

export interface Constants {
  DAI_TOKEN_ADDRESS: string;
  USDC_TOKEN_ADDRESS: string;
  EVENTS_STORAGE_KEY: string;
}

export interface Config {
  env: Env;
  constants: Constants;
  customThemes: CustomThemes;
}
