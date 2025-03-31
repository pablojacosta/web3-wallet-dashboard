import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet, walletConnectWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { http, cookieStorage, createStorage, createConfig } from 'wagmi';
import { sepolia, mainnet, Chain } from 'wagmi/chains';
import { getConfig } from '~/config';
import { getConstants } from '~/config/constants';

const { PROJECT_ID } = getConfig().env;

export const { DAI_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS, EVENTS_STORAGE_KEY } = getConstants();

export const SUPPORTED_CHAINS = [sepolia, mainnet] as [Chain, ...Chain[]];

const transports = Object.fromEntries(SUPPORTED_CHAINS.map((chain) => [chain.id, http()]));

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
  transports,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  batch: { multicall: true },
  connectors,
});
