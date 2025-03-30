import { Constants } from '~/types';

const constants: Constants = {
  DAI_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_DAI_TOKEN_ADDRESS as string,
  USDC_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS as string,
  EVENTS_STORAGE_KEY: process.env.NEXT_PUBLIC_EVENTS_STORAGE_KEY as string,
};

export const getConstants = (): Constants => {
  return constants;
};
