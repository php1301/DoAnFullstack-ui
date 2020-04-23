import Head from 'next/head';
import SearchArea from '../container/Home/Search/Search';

// eslint-disable-next-line arrow-body-style
const Home = () => {
  return (
    <>
      <Head>
        <title>Hotel | A react next listing template</title>
      </Head>
      <SearchArea />
    </>
  );
};
export default Home;
