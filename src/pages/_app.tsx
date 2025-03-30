import { AppProps } from 'next/app';
import { Modal } from '~/components/Modal';
import { Providers } from '~/providers';
import Layout from './layout';

const Home = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
        <Modal />
      </Layout>
    </Providers>
  );
};

export default Home;
