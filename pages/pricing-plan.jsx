import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import PricingItems from 'container/Pricing/PricingItems';
import PricingWrapper, {
  PricingHeader,
  Title,
  Description,
  ButtonGroup,
  PricingTableArea,
  Button,
} from 'container/Pricing/Pricing.style';

// Render số lượng ít nhiều nhờ map các array
const monthlyPlans = [
  {
    title: 'Basic Plan',
    key: 'BPM',
    price: '0.00',
    type: 'monthly',
    features: [
      {
        title: 'Ultimate campaigns',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic donner data',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Team fundraising',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi team tasking',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Basic registration & Ticketing',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Basic theming',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Email Reciept',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Expensive donor data',
        icon: <CloseCircleOutlined theme="filled" />,
      },
    ],
  },
  {
    title: 'Standard Plan',
    key: 'SPM',
    price: '75.80',
    type: 'monthly',
    features: [
      {
        title: 'Ultimate campaigns',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic donner data',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Team fundraising',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi team tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic registration & Ticketing',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic theming',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Email Receipt',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Expensive donor data',
        icon: <CloseCircleOutlined theme="filled" />,
      },
    ],
  },
  {
    title: 'Premium Plan',
    key: 'PMM',
    price: '175.00',
    type: 'monthly',
    features: [
      {
        title: 'Ultimate campaigns',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic donner data',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Team fundraising',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi team tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic registration & Ticketing',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic theming',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Email Reciept',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Expensive donor data',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
    ],
  },
];
const annuallyPlans = [
  {
    title: 'Basic Plan',
    key: 'BPA',
    price: '0.00',
    type: 'annually',
    features: [
      {
        title: 'Ultimate campaigns',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic donner data',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Team fundraising',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi team tasking',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Basic registration & Ticketing',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Basic theming',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Email Reciept',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Expensive donor data',
        icon: <CloseCircleOutlined theme="filled" />,
      },
    ],
  },
  {
    title: 'Standard Plan',
    key: ' SPA',
    price: '50.80',
    type: 'annually',
    features: [
      {
        title: 'Ultimate campaigns',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic donner data',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Team fundraising',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi team tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic registration & Ticketing',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic theming',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Email Reciept',
        icon: <CloseCircleOutlined theme="filled" />,
      },
      {
        title: 'Expensive donor data',
        icon: <CloseCircleOutlined theme="filled" />,
      },
    ],
  },
  {
    title: 'Premium Plan',
    key: 'PPA',
    price: '150.00',
    type: 'annually',
    features: [
      {
        title: 'Ultimate campaigns',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic donner data',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Team fundraising',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Multi team tasking',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic registration & Ticketing',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Basic theming',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Email Reciept',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
      {
        title: 'Expensive donor data',
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      },
    ],
  },
];

export default function Pricing({ user }) {
  const [currentPlan, setCurrentPlan] = useState('monthly');
  let plans = [];
  if (currentPlan === 'monthly') {
    plans = monthlyPlans;
  }
  if (currentPlan === 'annually') {
    plans = annuallyPlans;
  }
  return (
    <PricingWrapper>
      <ToastContainer />
      <Head>
        <title>Pricing Plan</title>
      </Head>
      <PricingHeader>
        <Title>Select Your Pricing Plan</Title>
        <Description>
          Simple Transparent pricing for everyone, whether you are local hotel
          owner or an agent.
        </Description>
        <ButtonGroup>
          <Button
            onClick={() => setCurrentPlan('monthly')}
            className={currentPlan === 'monthly' ? 'active' : null}
          >
            Monthly
          </Button>
          <Button
            onClick={() => setCurrentPlan('annually')}
            className={currentPlan === 'annually' ? 'active' : null}
          >
            Annually
          </Button>
        </ButtonGroup>
      </PricingHeader>
      <PricingTableArea>
        <PricingItems user={user} plans={plans} />
      </PricingTableArea>
    </PricingWrapper>
  );
}
