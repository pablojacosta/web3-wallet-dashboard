import { Env } from '~/types';

const env: Env = {
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID as string,
};

export const getEnv = (): Env => {
  return env;
};
