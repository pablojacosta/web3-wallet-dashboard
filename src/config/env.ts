import { Env } from '~/types';

const env: Env = {
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  TEST_ENV: process.env.NEXT_PUBLIC_TEST_ENV === 'true',
};

export const getEnv = (): Env => {
  return env;
};
