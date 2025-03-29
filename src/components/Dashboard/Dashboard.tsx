import { useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ETokenType } from '~/enums/tokenType';
import { Toggle } from './components/Toggle';
import { TokenCard } from './components/TokenCard';

export const Dashboard = () => {
  const [selectedToken, setSelectedToken] = useState<ETokenType>(ETokenType.DAI);

  // TODO: replace mocks with real values
  const isConnected = true;
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
