import { useEffect } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { EErrorMessage, EMessageStatus } from '~/enums';
import { useModalStore } from '~/store/useModalStore';
import { SUPPORTED_CHAINS } from '~/utils';

export const useNetworkCheck = () => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { setShowModal } = useModalStore();
  const sepoliaChain = SUPPORTED_CHAINS[0];

  const checkNetwork = () => {
    const isSupportedChain = chainId === sepoliaChain.id;

    if (!isSupportedChain) {
      try {
        switchChain({ chainId: sepoliaChain.id });
        setShowModal(true, EErrorMessage.WRONG_NETWORK, EMessageStatus.ERROR);
      } catch (error) {
        console.error('Network switch error:', error);
        setShowModal(true, EErrorMessage.UNKNOWN_NETWORK_ERROR, EMessageStatus.ERROR);
      }
    }
  };

  useEffect(() => {
    checkNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return { checkNetwork, chainId };
};
