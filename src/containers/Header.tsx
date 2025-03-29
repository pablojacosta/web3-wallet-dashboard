import { styled } from '@mui/material/styles';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { HEADER_HEIGHT, zIndex } from '~/utils';

export const Header = () => {
  return (
    <StyledHeader>
      <StyledTitle>Wallet Dashboard</StyledTitle>

      <ConnectButton />
    </StyledHeader>
  );
};

//Styles
const StyledHeader = styled('header')(({ theme }) => ({
  display: 'flex',
  height: `${HEADER_HEIGHT}rem`,
  padding: '0 8rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.secondary,
  width: '100%',
  zIndex: zIndex.HEADER,
}));

const StyledTitle = styled('h1')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  color: theme.palette.text.primary,
}));
