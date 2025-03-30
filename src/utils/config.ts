import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet, walletConnectWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { http, cookieStorage, createStorage, createConfig } from 'wagmi';
import { sepolia, localhost } from 'wagmi/chains';
import { getConfig } from '~/config';
import { getConstants } from '~/config/constants';

const { PROJECT_ID } = getConfig().env;

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
  chains: [localhost, sepolia],
  transports: {
    [localhost.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  batch: { multicall: true },
  connectors,
});

export const { DAI_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS, EVENTS_STORAGE_KEY } = getConstants();
