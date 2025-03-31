import { useEffect } from 'react';
import { useNetworkCheck } from '~/hooks/useNetworkCheck';

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
  const { checkNetwork } = useNetworkCheck();

  useEffect(() => {
    checkNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
