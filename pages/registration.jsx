import { useState, useContext } from 'react';
import { useMutation } from 'react-apollo';
import { toast, ToastContainer } from 'react-toastify';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import Link from 'next/link';
import Router from 'next/router';
import Head from 'next/head';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Divider from 'components/UI/Antd/Divider/Divider';
import Button from 'components/UI/Antd/Button/Button';
import Logo from 'components/UI/Logo/Logo';
import SignUpForm from 'container/SignUp/SignUpForm';
import { LOGIN_PAGE } from 'settings/constants';
import { USER_COOKIE } from 'library/helpers/session';
import { REGISTRATION_PAGE } from 'settings/constants';
import { AuthContext } from 'context/AuthProvider';
import { FACEBOOK_LOGIN, GOOGLE_LOGIN } from 'apollo-graphql/mutation/mutation';
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
  const { addItem, setUser, setLoggedIn } = useContext(AuthContext);
  const [facebookLogin] = useMutation(FACEBOOK_LOGIN);
  const [googleLogin] = useMutation(GOOGLE_LOGIN);
  const [state, setState] = useState({
    facebookBtnLoading: false,
    githubBtnLoading: false,
    twitterBtnLoading: false,
    googleBtnLoading: false,
  });

  const responseFacebook = async response => {
    setState({ ...state, facebookBtnLoading: true });
   
    // console.log(response);
    try {
    const userPayload = await facebookLogin({
      variables: {
        email: response.email,
        accessToken: response.accessToken,
        socialInfo: response.name,
        socialId: response.id,
        socialProfileLink: response.link || 'https://www.facebook.com'
      }
    })
    // console.log(userPayload)
      setUser(userPayload.data.facebookLogin);
      addItem(USER_COOKIE, userPayload.data.facebookLogin);
      setTimeout(() => {
        setLoggedIn(true);
        setState({ ...state, facebookBtnLoading: false }, 2000);
    });
    }
    catch(e) {
      setTimeout(() => {
        setState({ ...state, facebookBtnLoading: false }, 2000);
    });
    toast.error(e.message, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    }
  };
  const responseGoogle = async response => {
    setState({ ...state, googleBtnLoading: true });
    // console.log(response)
    try {
      const userPayload = await googleLogin({
        variables: {
          email: response.profileObj.email,
          accessToken: response.accessToken,
          socialInfo: response.profileObj.name,
          socialId: response.googleId,
          profileImage: response.profileObj.imageUrl || 'https://i.imgur.com/Lio3cDN.png'
        }
      })
      // console.log(userPayload)
        setUser(userPayload.data.googleLogin);
        addItem(USER_COOKIE, userPayload.data.googleLogin);
        setTimeout(() => {
          setLoggedIn(true);
          setState({ ...state, googleBtnLoading: false }, 2000);
      });
      }
      catch(e) {
        setTimeout(() => {
          setState({ ...state, googleBtnLoading: false }, 2000);
      });
      toast.error(e.message, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      }
  }
  const responseGithub = () => {
    setState({ ...state, githubBtnLoading: true });
    Router.push(`//github.com/login/oauth/authorize?client_id=95ca68a24f1a6d7342e7&scope=user&redirect_uri=https://vercel-v2.hotel-prisma.ml/auth-processing`)
    setTimeout(() => {
      setState({ ...state, githubBtnLoading: false }, 600);
    });
  };
  const twitterAuthAction = () => {
    setState({ ...state, twitterBtnLoading: true });
    setTimeout(() => {
      setState({ ...state, twitterBtnLoading: false });
    }, 600);
  };
  return (
    <SignUpWrapper>
      <ToastContainer/>
      <SignUpFormWrapper>
        <Head>
          <title>
            Register
          </title>
        </Head>
        <Logo withLink linkTo="/" src={tripFinder} title="TripFinder." />
        <Title>Welcome to TripFinder.</Title>
        <TitleInfo>Please register for your account</TitleInfo>
        <SignUpForm />
        <Divider>Or Register With </Divider>
        <Row gutter={16}>
        <Col span={12}>
          <FacebookLogin
            appId={process.env.FACEBOOK_APP_ID}
            fields="name,email,picture,link"
            scope="public_profile,user_link"
            callback={ (value) =>{ responseFacebook(value); }}
            render={props=>(
            <Button
              loading={state.facebookBtnLoading}
              className="facebook-btn"
              type="primary"
              style={{ width: '100%', marginBottom: 16 }}
              size="large"
              onClick={ (value)=> { props.onClick(value); }}
            >
              Facebook
            </Button>
            )}
            />
          </Col>
          <Col span={12}>
            <Button
              loading={state.githubBtnLoading}
              className="github-btn"
              type="primary"
              style={{ width: '100%', marginBottom: 16 }}
              size="large"
              onClick={()=>{ responseGithub(); }}
            >
              Github
            </Button>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: '37px' }}>
          <Col span={12}>
            <Button
              loading={state.twitterBtnLoading}
              className="firebase-btn"
              type="primary"
              style={{ width: '100%', marginBottom: 16 }}
              size="large"
              disabled
              onClick={twitterAuthAction}
            >
              Twitter
            </Button>
          </Col>
          <Col span={12}>
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            render={renderProps => (
              <Button
              loading={state.googleBtnLoading}
              className="google-btn"
              type="primary"
              style={{ width: '100%', marginBottom: 16 }}
              size="large"
              onClick={(value)=>{renderProps.onClick(value);}}
            >
              Gmail
            </Button>            )}
            buttonText="Login"
            onSuccess={(value)=>{ responseGoogle(value); }}
            onFailure={(value)=>{ responseGoogle(value); }}
            cookiePolicy={'single_host_origin'}
          />
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