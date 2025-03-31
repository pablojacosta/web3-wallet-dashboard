import type { ReactNode } from 'react';
import { NetworkProvider } from './NetworkProvider';
import { ThemeProvider } from './ThemeProvider';
import { WalletProvider } from './WalletProvider';

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <WalletProvider>
        <NetworkProvider>{children}</NetworkProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};
