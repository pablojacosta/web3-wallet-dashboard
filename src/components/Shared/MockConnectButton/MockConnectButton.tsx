import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { config, MOCK_ADDRESS } from '~/utils';

export const MockConnectButton = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isDisconnected } = useAccount();

  const handleMockConnect = () => connect({ connector: config.connectors[0] });
  const handleMockDisconnect = () => disconnect({ connector: config.connectors[0] });

  if (isDisconnected) {
    return (
      <button data-testid='mock-connect-button' onClick={handleMockConnect}>
        Mock Connect
      </button>
    );
  }

  return (
    <button data-testid='mock-disconnect-button' onClick={handleMockDisconnect}>
      <p data-testid='mock-wallet-address'>{MOCK_ADDRESS}</p>
    </button>
  );
};
