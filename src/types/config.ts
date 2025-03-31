import { Chain } from 'viem';
import { CustomThemes } from '~/types';

export interface Env {
  PROJECT_ID: string;
}

export interface Constants {
  DAI_TOKEN_ADDRESS: string;
  USDC_TOKEN_ADDRESS: string;
  EVENTS_STORAGE_KEY: string;
  SUPPORTED_CHAINS: readonly [Chain, ...Chain[]];
}

export interface Config {
  env: Env;
  constants: Constants;
  customThemes: CustomThemes;
}
