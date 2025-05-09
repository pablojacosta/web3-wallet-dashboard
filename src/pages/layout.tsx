import { CssBaseline, styled } from '@mui/material';
import { Footer, Header } from '~/containers';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '~/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />

      <MainContent>
        <NoScriptMessage>
          <p>This website requires JavaScript to function properly.</p>
        </NoScriptMessage>

        <Header />
        {children}
        <Footer />
      </MainContent>
    </>
  );
}

const MainContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '100%',
  overflowX: 'hidden',
  margin: '0 auto',
  paddingTop: `${HEADER_HEIGHT}rem`,
  paddingBottom: `${FOOTER_HEIGHT}rem`,
  minHeight: '100vh',
});

const NoScriptMessage = styled('noscript')(() => {
  return {
    margin: '0 auto',
    width: '100%',
    textAlign: 'center',
    fontSize: '1.6rem',
    padding: '1rem 0',
    p: {
      padding: '1rem 0',
      margin: 0,
    },
  };
});
