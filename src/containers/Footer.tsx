import { styled } from '@mui/material/styles';
import { FOOTER_HEIGHT } from '~/utils';

export const Footer = () => {
  return (
    <FooterContainer>
      <h1>Pablo Acosta - Frontend Challenge</h1>
    </FooterContainer>
  );
};

const FooterContainer = styled('footer')(({ theme }) => ({
  display: 'flex',
  height: `${FOOTER_HEIGHT}rem`,
  padding: '0 8rem',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.secondary,
  borderTop: theme.palette.border,
  width: '100%',
  color: theme.palette.text.secondary,
}));
