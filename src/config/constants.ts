import { Constants } from '~/types';

const constants: Constants = {
  DAI_TOKEN_ADDRESS: '0x1D70D57ccD2798323232B2dD027B3aBcA5C00091',
  USDC_TOKEN_ADDRESS: '0xC891481A0AaC630F4D89744ccD2C7D2C4215FD47',
  EVENTS_STORAGE_KEY: 'transaction-events-storage',
  MAX_MINTS: 100,
  MIN_MINTS: 0.01,
  MOCK_ADDRESS: '0x14Df18359448ADdC29c39538DCF07D7baBC75537',
};

export const getConstants = (): Constants => {
  return constants;
};
