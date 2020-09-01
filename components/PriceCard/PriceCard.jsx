import React from 'react';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { UPDATE_STRIPE_ID } from 'apollo-graphql/mutation/mutation';
import PriceCardWrapper, {
  Title,
  Price,
  PricingHeader,
  PricingList,
  PriceAction,
  Button,
} from './PriceCard.style';

export default function PriceCard({
  className, data, buttonText, user,
}) {
  let price; let
    pricingPlan;
  const [updateStripeId] = useMutation(UPDATE_STRIPE_ID, {
    onCompleted: () => {
      toast.success('Plan updated succesfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        Router.reload();
      }, 4000);
    },
  });
  const handleStripeConnect = async (type) => {
    if (user.role === 'Normal') {
      const plan = {
        email: user.email,
        type,
      };
      const accountTest = await fetch('https://hotel-prisma.vercel.app/api/mock-stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Nhớ body phải match Content-Type
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(plan),
      });
      const accountTestPayload = await accountTest.json();
      Router.push(accountTestPayload.accountLink.url.slice(6));
    } else {
      await updateStripeId({
        variables: {
          type,
        },
      });
      const newCookie = { ...user, role: type };
      Cookies.set('user', newCookie, { expires: 7 });
    }
  };
  if (data.type === 'annually') {
    price = Math.ceil(data.price) * 12;
    pricingPlan = '/per year';
  } else {
    price = data.price;
    pricingPlan = '/per month';
  }

  return (
    <PriceCardWrapper className={className}>
      <PricingHeader>
        <Title>{data.title}</Title>
        <Price>
          <strong>
            $
            {price}
            {' '}
            USD
          </strong>
          <span>{pricingPlan}</span>
        </Price>
      </PricingHeader>
      <PricingList>
        {data.features.map((feature) => (
          <li key={feature.title}>
            {feature.icon}
            <span>{feature.title}</span>
          </li>
        ))}
      </PricingList>
      <PriceAction>
        <Button
          style={user.role === data.key ? {
            color: '#ffffff',
            backgroundColor: '#008489',
            cursor: 'no-drop',
          } : {}}
          disabled={user.role === data.key}
          onClick={() => { handleStripeConnect(data.key); }}
        >
          {user.role === data.key ? 'Selected Plan' : buttonText}
        </Button>
      </PriceAction>
    </PriceCardWrapper>
  );
}
