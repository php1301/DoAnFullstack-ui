import { useState } from 'react';
import Link from 'next/link';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Divider from 'components/UI/Antd/Divider/Divider';
import Button from 'components/UI/Antd/Button/Button';
import Logo from 'components/UI/Logo/Logo';
import SignUpForm from 'container/SignUp/SignUpForm';
import { LOGIN_PAGE } from 'settings/constants';
import SignUpWrapper, {
  Title,
  TitleInfo,
  Text,
  SignUpFormWrapper,
  SignUpBannerWrapper,
} from '../container/SignUp/SignUp.style';
// demo image
import signInImage from 'assets/images/login-page-bg.jpg';
import tripFinder from 'assets/images/logo-alt.svg';

const SignUp = () => {
  const [state, setState] = useState({
    facebookBtnLoading: false,
    githubBtnLoading: false,
    firebaseBtnLoading: false,
    googleBtnLoading: false,
  });

  const facebookAuthAction = () => {
    setState({ ...state, facebookBtnLoading: true });
    setTimeout(() => {
      setState({ ...state, facebookBtnLoading: false });
    }, 600);
  };

  const githubAuthAction = () => {
    setState({ ...state, githubBtnLoading: true });
    setTimeout(() => {
      setState({ ...state, githubBtnLoading: false });
    }, 600);
  };

  const firebaseAuthAction = () => {
    setState({ ...state, firebaseBtnLoading: true });
    setTimeout(() => {
      setState({ ...state, firebaseBtnLoading: false });
    }, 600);
  };

  const googleAuthAction = () => {
    setState({ ...state, googleBtnLoading: true });
    setTimeout(() => {
      setState({ ...state, googleBtnLoading: false });
    }, 600);
  };

  return (
    <SignUpWrapper>
      <SignUpFormWrapper>
        <Logo withLink linkTo="/" src={tripFinder} title="TripFinder." />
        <Title>Welcome to TripFinder.</Title>
        <TitleInfo>Please register for your account</TitleInfo>
        <SignUpForm />
        <Divider>Or Register up with </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Button
              loading={state.facebookBtnLoading}
              className="facebook-btn"
              type="primary"
              style={{ width: '100%', marginBottom: 16 }}
              size="large"
              onClick={facebookAuthAction}
            >
              Facebook
            </Button>
          </Col>
          <Col span={12}>
            <Button
              loading={state.githubBtnLoading}
              className="github-btn"
              type="primary"
              style={{ width: '100%', marginBottom: 16 }}
              size="large"
              onClick={githubAuthAction}
            >
              Github
            </Button>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: '37px' }}>
          <Col span={12}>
            <Button
              loading={state.firebaseBtnLoading}
              className="firebase-btn"
              type="primary"
              style={{ width: '100%', marginBottom: 16 }}
              size="large"
              onClick={firebaseAuthAction}
            >
              Firebase
            </Button>
          </Col>
          <Col span={12}>
            <Button
              loading={state.googleBtnLoading}
              className="google-btn"
              type="primary"
              style={{ width: '100%', marginBottom: 16 }}
              size="large"
              onClick={googleAuthAction}
            >
              Google+
            </Button>
          </Col>
        </Row>
        <Text>
          Already have an account! &nbsp;
          <Link href={`${LOGIN_PAGE}`}>
            <a>Login</a>
          </Link>
        </Text>
      </SignUpFormWrapper>

      <SignUpBannerWrapper>
        <div
          style={{
            backgroundImage: `url(${signInImage})`,
            backgroundPosition: 'center center',
            height: '100vh',
            backgroundSize: 'cover',
          }}
        />
      </SignUpBannerWrapper>
    </SignUpWrapper>
  );
}
export default SignUp