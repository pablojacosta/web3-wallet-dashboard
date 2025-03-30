'use client';

import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAccount } from 'wagmi';
import { ETokenType } from '~/enums/tokenType';
import { useWalletStore } from '~/store/useWalletStore';
import { Toggle } from './components/Toggle';
import { TokenCard } from './components/TokenCard';

export const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { setAddress } = useWalletStore();
  const [selectedToken, setSelectedToken] = useState<ETokenType>(ETokenType.DAI);

  useEffect(() => {
    setAddress(address || null);
  }, [address, setAddress]);

  const handleTokenChange = (_event: React.MouseEvent<HTMLElement>, newToken: ETokenType.DAI) => {
    if (newToken === null) {
      return;
    }

    setSelectedToken(newToken);
  };

  return (
    <StyledContainer>
      {isConnected && (
        <>
          <Toggle selectedToken={selectedToken} handleTokenChange={handleTokenChange} />

          <TokenCard token={selectedToken} />
        </>
      )}

      {!isConnected && (
        <Typography variant='h6' textAlign='center' color='text.secondary'>
          Please connect your wallet to view token balances and perform transactions
        </Typography>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '2rem',
});
