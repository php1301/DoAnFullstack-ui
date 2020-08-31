/* eslint-disable no-unused-expressions */
import { useState, useCallback, useRef } from 'react';
import { useQuery } from 'react-apollo';
import { ToastContainer } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';
import BillingForm from 'container/Payment/BillingForm';
import OrderInfo from 'container/Payment/OrderInfo';
import OffersTable from 'container/Payment/OffersTable';
import Checkbox from 'components/UI/Antd/Checkbox/Checkbox';
import Box from 'components/UI/Box/Box';
import { PaymentWrapper, CheckoutContents } from 'container/Payment/Payment.style';


import { GET_VENDOR_STRIPE_ID } from 'apollo-graphql/query/query';
import redirect from 'library/helpers/redirect';
import { withPaymentSecret } from 'library/helpers/restriction';

// Fake loader với tham số setTimeOut


// Xử lý stepper, ở step 2 truyền các component con tương ứng
const PaymentForm = ({
  query, user,
}) => {
  const [checked, setChecked] = useState(false);
  const handleShowOffers = useCallback(() => {
    setChecked((prev) => !prev);
  }, [setChecked]);
  const billingFormRef = useRef();
  const [couponUsed, setCouponUsed] = useState(null);
  const total = (query
    && (
      (parseInt(query.room, 10)
    * parseInt(query.guest, 10)
    * parseInt(query.range, 10))
    * query.price)) || 0;
  const { data: stripeIdData, loading: loadingStripeIdData } = useQuery(GET_VENDOR_STRIPE_ID, {
    variables: {
      id: query.agentId,
    },
  });
  if (loadingStripeIdData) return '...';
  const stripePromise = loadStripe(process.env.PUBLIC_STRIPE,
    { stripeAccount: stripeIdData.getVendorStripeId.stripeId || 'acct_1HIpGQF9hC5TYyzM' });
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContents>
        <Head>
          <title>
            Payment
          </title>
        </Head>
        <PaymentWrapper className="isoCheckoutPage">
          <ToastContainer />
          <Box className="isoBoxWrapper">
            <div className="isoBillingAddressWrapper">
              <h3 className="isoSectionTitle">Billing details</h3>
              <div className="isoBillingSection">
                <BillingForm
                  email={(user && user.email) || ''}
                  first_name={(user && user.first_name) || ''}
                  last_name={(user && user.last_name) || ''}
                  billingFormRef={billingFormRef}
                />
                <OrderInfo
                  email={(user && user.email) || ''}
                  first_name={(user && user.first_name) || ''}
                  last_name={(user && user.last_name) || ''}
                  agentId={query.agentId}
                  authorId={user && user.id}
                  id={query.id}
                  couponUsed={couponUsed}
                  billingFormRef={billingFormRef}
                  startDate={query.startDate}
                  endDate={query.endDate}
                  range={query.range}
                  stripeId={stripeIdData.getVendorStripeId.stripeId || 'acct_1HIpGQF9hC5TYyzM'}
                  guest={query.guest}
                  price={query.price}
                  room={query.room}
                  title={query.title}
                  propertyType={query.propertyType}
                  lat={query.lat}
                  lng={query.lng}
                  address={query.address}
                  total={total}
                />
              </div>
              <Checkbox onChange={() => { handleShowOffers(); }}>
                See Offers Available for this Hotel
              </Checkbox>
              {checked
            && (
            <OffersTable
              setCouponUsed={setCouponUsed}
              id={query.id}
              total={total}
            />
            )}
            </div>
          </Box>
        </PaymentWrapper>
      </CheckoutContents>
    </Elements>
  );
};


PaymentForm.getInitialProps = async (context) => {
  const { query } = context;
  const secret = withPaymentSecret(context);
  // Nên lưu 1 field tạm ở DB và gọi API check và API hủy
  if (query.secret !== secret) redirect(context, '/error');
  query.id && query.room !== 0
  && query.address
  && query.lat
  && query.lng
  && query.agentId
  && query.propertyType
  && query.guest !== 0
  && query.startDate !== 0
  && query.endData !== 0
    ? query.id
    : redirect(context, '/error');
  return {
    query,
  };
};
export default PaymentForm;
