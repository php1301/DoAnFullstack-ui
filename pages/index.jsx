import Head from 'next/head';
import NavBar from '../components/Navbar/Navbar';
import Cover from '../components/Cover/Cover';

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="shortcut icon"
        href="https://storage.googleapis.com/builderbook/favicon32.png"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Muli:300,400:latin"
      />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Head>
    <NavBar />
    <Cover />
  </div>
);

export default Home;
