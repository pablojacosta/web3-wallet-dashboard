import Head from 'next/head';
import { Landing } from '~/containers';

const Home = () => {
  return (
    <>
      <Head>
        <title>Wallet Dashboard</title>
      </Head>
      <Landing />
    </>
  );
};

export default Home;
