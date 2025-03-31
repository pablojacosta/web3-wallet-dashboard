import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet, walletConnectWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { http, cookieStorage, createStorage, createConfig } from 'wagmi';
import { getConfig } from '~/config';
import { getConstants } from '~/config/constants';

const { PROJECT_ID } = getConfig().env;
export const { DAI_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS, EVENTS_STORAGE_KEY, SUPPORTED_CHAINS } = getConstants();

const getWallets = () => {
  if (PROJECT_ID) {
    return [injectedWallet, rainbowWallet, walletConnectWallet];
  } else {
    return [injectedWallet];
  }
};

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: getWallets(),
    },
  ],
  {
    appName: 'Wallet Dashboard',
    projectId: PROJECT_ID,
  },
);

export const config = createConfig({
  chains: SUPPORTED_CHAINS,
  transports: Object.fromEntries(SUPPORTED_CHAINS.map((chain) => [chain.id, http()])),
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  batch: { multicall: true },
  connectors,
});
