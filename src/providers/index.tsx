import type { ReactNode } from 'react';
import { NetworkProvider } from './NetworkProvider';
import { StateProvider } from './StateProvider';
import { ThemeProvider } from './ThemeProvider';
import { WalletProvider } from './WalletProvider';

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <StateProvider>
        <WalletProvider>
          <NetworkProvider>{children}</NetworkProvider>
        </WalletProvider>
      </StateProvider>
    </ThemeProvider>
  );
};
