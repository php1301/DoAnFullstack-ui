import React from 'react';
import Logo from 'components/UI/Logo/Logo';
import ForgetPassWordForm from '../container/ForgetPassWord/ForgetPassWordForm';
import ForgetPassWordWrapper, {
  Title,
  TitleInfo,
  ForgetPassWordFormWrapper,
  ForgetPassWordBannerWrapper,
} from '../container/ForgetPassWord/ForgetPassWord.style';
// demo image
import signInImage from 'assets/images/login-page-bg.jpg';
import palace from 'assets/images/logo-alt.svg';

const ForgetPassWord = () => {
  return (
    <ForgetPassWordWrapper>
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
export default ForgetPassWord