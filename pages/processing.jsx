/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import { useMutation } from 'react-apollo';
import Loader from 'components/Loader/Loader';
import { UPDATE_STRIPE_ID } from 'apollo-graphql/mutation/mutation';
import { toast } from 'react-toastify';
import Router from 'next/router';
import redirect from 'library/helpers/redirect';

const Processing = ({ query }) => {
  const [success, setSuccess] = useState(false);
  const [updateStripeId] = useMutation(UPDATE_STRIPE_ID, {
    onCompleted: () => {
      setSuccess(true);
      toast.success('Validation successfully you will now be redirected to profile', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        Router.push('/profile');
      }, 6000);
    },
  });
  setTimeout(() => {
    updateStripeId({
      variables: {
        stripeId: query.accountId,
        type: query.plan,
      },
    });
  }, 6000);
  return (success ? (<Loader />) : '...');
};


export async function getServerSideProps({ query, ...context }) {
  (!query.accountId || !query.plan) && redirect(context, '/error');
  return { props: { query } };
}

export default Processing;
