import { AppProps } from 'next/app';
import { ErrorModal } from '~/components/ErrorModal';
import { Providers } from '~/providers';
import Layout from './layout';

const Home = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
        <ErrorModal />
      </Layout>
    </Providers>
  );
};

export default Home;
