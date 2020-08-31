/* eslint-disable no-unused-expressions */
import { useEffect } from 'react';
import { useMutation } from 'react-apollo';
import Router from 'next/router';
import Head from 'next/head';
import Loader from 'components/Loader/Loader';
import Cookies from 'js-cookie';
import { UPDATE_STRIPE_ID } from 'apollo-graphql/mutation/mutation';
import { toast } from 'react-toastify';
import redirect from 'library/helpers/redirect';

const Processing = ({ user, query }) => {
  const [updateStripeId] = useMutation(UPDATE_STRIPE_ID, {
    onCompleted: () => {
      toast.success('Validation successfully you will now be redirected to profile', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const newCookie = { ...user, role: query.plan };
      Cookies.set('user', newCookie, { expires: 7 });
      Router.replace('/profile?u=1');
    },
  });
  useEffect(async () => {
    await updateStripeId({
      variables: {
        stripeId: query.accountId,
        type: query.plan,
      },
    });
  }, []);
  return (
    <>
      <Head>
        <title>
          Processing...
        </title>
      </Head>
      <Loader />
    </>
  );
};


export async function getServerSideProps({ query, ...context }) {
  (!query.accountId || !query.plan) && redirect(context, '/error');
  return { props: { query } };
}

export default Processing;
