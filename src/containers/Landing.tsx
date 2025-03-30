import { styled } from '@mui/material/styles';
import { Dashboard } from '~/components/Dashboard';

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
  height: '100%',
  padding: '0 2rem',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});
