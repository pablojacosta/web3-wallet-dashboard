import { styled } from '@mui/material/styles';
import { Dashboard } from '~/components/Dashboard';
import { SURROUND_HEIGHT } from '~/utils';

export const Landing = () => {
  return (
    <LandingContainer>
      <Dashboard />
    </LandingContainer>
  );
};

const LandingContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: `calc(100vh - ${SURROUND_HEIGHT}rem)`,
  padding: '0 2rem',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});
