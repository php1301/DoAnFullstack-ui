/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE, USER_COOKIE } from 'library/helpers/session';
import redirect from 'library/helpers/redirect';
import { LOGIN, SIGNUP } from 'apollo-graphql/mutation/mutation';
import { useMutation } from 'react-apollo';

export const AuthContext = React.createContext();


// const fakeUserData = {
//   id: 1,
//   name: 'John Doe',
//   avatar:
//       'https://i.imgur.com/Lio3cDN.png',
//   roles: ['USER', 'ADMIN'],
// };

/**
 * Mock jwt từ jwt.io
 * Token thật đến từ server khi login
 */

// eslint-disable-next-line max-len
// const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoidGFyZXEgam9iYXllcmUiLCJyb2xlcyI6ImFkbWluIn0.k74_B-zeWket405dIAt018mnQFMh_6_BTFpjB77HtRQ';

const addItem = (key, value = '') => {
// 2 options
// Sử dụng localStorage
// if (key) localStorage.setItem(key, value);
// Cookies
  if (key) Cookies.set(key, value, { expires: 7 });
};

const clearItem = (key) => {
  // if (key) localStorage.remove(key);
  // Cookies
  Cookies.remove(key);
};

const isValidToken = () => {
  // localStorage
  // const token = localStorage.getItem(TOKEN_COOKIE);

  // Cookies

  const token = Cookies.get(TOKEN_COOKIE);
  // JWT decode & check token hợp lệ và expire chưa
  if (token) return true;
  return false;
};

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(isValidToken());
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [login] = useMutation(LOGIN);
  const [signup] = useMutation(SIGNUP);

  async function signIn(params) {
    //   Gửi post request đây và authenticate with fetch/axios/swr,...
    //   return true thì đổi state
    //   Mutation của graphql là async, trả về promise
    //   Có thể sử dụng promise chaining hoặc async await để handle

    try {
      const userPayload = await login({
        variables: {
          loginInput: {
            email: params.email,
            password: params.password,
          },
        },
      });
      // const tokenPayload = Cookies.get('token');
      setUser(userPayload.data.login);
      // setToken(tokenPayload);
      // addItem(TOKEN_COOKIE, tokenPayload);
      addItem(USER_COOKIE, userPayload.data.login);
      // addItem(USER_COOKIE, fakeUserData);
      setLoggedIn(true);
    } catch (e) {
    // Nhớ render ToastContainer ít nhất 1 lần ở trong root app/page
      toast.error(e.message.slice(15), {
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
  async function signUp(params) {
    //   Gọi post request ở đây và trả về user và setState
    try {
      const userPayload = await signup({
        variables: {
          signUpInput: {
            username: params.username,
            first_name: params.first_name ?? 'somebody',
            last_name: params.last_name ?? 'somebody',
            email: params.email,
            password: params.password,
            profile_pic_main: 'https://i.imgur.com/Lio3cDN.png',
            cover_pic_main: 'https://i.imgur.com/lXybeGM.png',
          },
        },
      });
      const tokenPayload = Cookies.get('token');
      setUser(userPayload.data.signup);
      setToken(tokenPayload);
      addItem(TOKEN_COOKIE, tokenPayload);
      addItem(USER_COOKIE, userPayload.data.signup);
      // addItem(USER_COOKIE, fakeUserData);
      setLoggedIn(true);
      redirect({}, '/account-settings');
    } catch (e) {
      // Try catch của error có 3 props default là name, message, stack
      toast.error(e.message.slice(15), {
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

  //    3rd-party Authentication [vd. Autho0, firebase, AWS etc]
  const tokenAuth = (token3rd, user3rd = {}) => {
    setUser(user3rd);
    setToken(token3rd);
    addItem(TOKEN_COOKIE, token3rd);
    addItem(USER_COOKIE, user3rd);
    setLoggedIn(true);
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    clearItem(TOKEN_COOKIE);
    clearItem(USER_COOKIE);
    setLoggedIn(false);
    window.location.reload();
    // redirect({}, '/');
  };

  const { children } = props;
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        logOut,
        signIn,
        signUp,
        setUser,
        setLoggedIn,
        tokenAuth,
        addItem,
        user,
        token,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
export default AuthProvider;
