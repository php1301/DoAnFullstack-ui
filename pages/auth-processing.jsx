/* eslint-disable no-unused-expressions */
import { useEffect, useContext } from 'react';
import Router from 'next/router';
import Loader from 'components/Loader/Loader';
import { USER_COOKIE } from 'library/helpers/session';
import redirect from 'library/helpers/redirect';
import { AuthContext } from 'context/AuthProvider';

const AuthProcessing = ({ query }) => {
  const { addItem, setUser, setLoggedIn } = useContext(AuthContext);
  useEffect(async () => {
    const githubPayload = await fetch('http://localhost:3000/github/callback', {
      method: 'POST',
      credentials: 'include', // lưu token
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });
    if (githubPayload.status === 200) {
      const userPayload = await githubPayload.json();
      console.log(userPayload);
      setUser(userPayload.userSendToClient);
      addItem(USER_COOKIE, userPayload.userSendToClient);
      setLoggedIn(true);
      Router.replace('/account-settings');
    } else {
      redirect({}, '/error');
    }
  }, []);
  return <Loader />;
};

export async function getServerSideProps({ query, ...context }) {
  !query.code && redirect(context, '/error');
  return { props: { query } };
}

export default AuthProcessing;
