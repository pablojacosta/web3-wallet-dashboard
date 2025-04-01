import { styled } from '@mui/material/styles';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MockConnectButton } from '~/components/Shared/MockConnectButton/MockConnectButton';
import { fontSize, HEADER_HEIGHT, TEST_ENV, zIndex } from '~/utils';

export const Header = () => (
  <StyledHeader>
    <StyledTitle>Wallet Dashboard</StyledTitle>

    {!TEST_ENV && <ConnectButton />}

    {TEST_ENV && <MockConnectButton />}
  </StyledHeader>
);

const StyledHeader = styled('header')(({ theme }) => ({
  display: 'flex',
  height: `${HEADER_HEIGHT}rem`,
  padding: '0 2rem',
  [theme.breakpoints.up('md')]: {
    padding: '0 8rem',
  },
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.secondary,
  width: '100%',
  zIndex: zIndex.HEADER,
  position: 'fixed',
  top: '0',
  left: '0',
  borderBottom: theme.palette.border,
}));

const StyledTitle = styled('h1')(({ theme }) => ({
  fontSize: fontSize.SMALL,
  [theme.breakpoints.up('sm')]: {
    fontSize: fontSize.MEDIUM,
  },
  fontWeight: 'bold',
  cursor: 'pointer',
  color: theme.palette.text.primary,
}));
