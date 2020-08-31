import React from 'react';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import Logo from 'components/UI/Logo/Logo';
import ForgetPassWordForm from 'container/ForgetPassword/ForgetPasswordForm';
import { getIsLoggedIn } from 'library/helpers/restriction';
import redirect from 'library/helpers/redirect';
import ForgetPassWordWrapper, {
  Title,
  TitleInfo,
  ForgetPassWordFormWrapper,
  ForgetPassWordBannerWrapper,
} from 'container/ForgetPassword/ForgetPassword.style';
// demo image
import signInImage from 'assets/images/login-page-bg.jpg';
import palace from 'assets/images/logo-alt.svg';

const ForgetPassWord = () => {
  return (
    <ForgetPassWordWrapper>
      <Head>
      <title>Forget Password Page</title>
    </Head>
      <ToastContainer />
      <ForgetPassWordFormWrapper>
        <Logo withLink linkTo="/" src={palace} title="TripFinder." />
        <Title>Welcome Back</Title>
        <TitleInfo>Enter your email to recover your account</TitleInfo>
        <ForgetPassWordForm />
      </ForgetPassWordFormWrapper>
      <ForgetPassWordBannerWrapper>
        <div
          style={{
            backgroundImage: `url(${signInImage})`,
            backgroundPosition: 'center center',
            height: '100vh',
            backgroundSize: 'cover',
          }}
        />
      </ForgetPassWordBannerWrapper>
    </ForgetPassWordWrapper>
  );
}
export async function getServerSideProps(context) {
  const isLoggedIn = getIsLoggedIn(context);
  if (isLoggedIn === true) redirect(context, '/profile');
  return {
    props: {},
  };
}

export default ForgetPassWord;