import { useState } from 'react';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Router from 'next/router';
import Cookies from 'js-cookie';
import Button from 'components/UI/Antd/Button/Button';
import Tag from 'components/UI/Antd/Tag/Tag';
import {
  CREATE_TRANSACTION,
} from 'apollo-graphql/mutation/mutation';
import { OrderTable } from 'container/Payment/Payment.style';
const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};
const OrderInfo = ({
  startDate,
  endDate,
  range,
  guest,
  room,
  title,
  propertyType,
  price,
  couponUsed,
  total,
  id,
  agentId,
  authorId,
  billingFormRef,
  lat,
  lng,
  address,
  stripeId,
}) => {
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const [clientSecret, setClientSecret] = useState('')
  const elements = useElements();
  const stripe = useStripe();
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    onCompleted: (data) => {
      setTimeout(() => {
        setLoadingButton(false);
        setDisabled(true);
        toast.success('Your order requested Succesfully - Check your mail for tracking TXID 🎉🎉🎉',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 3000);
      setTimeout(()=>{
        toast.success(' Redirecting to TXID...',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 4000);
      setTimeout(()=>{
        // Replace để khi bấm back sẽ ko qua lại dc trang Payment
        Router.replace({pathname: '/search',query: {
          secretKey: data.createTransaction.transactionSecretKey
        }});
        Cookies.remove('secret');
      }, 6000);
    },
  });
  async function handlePlaceOrder() {
    setLoadingButton(true);
    const clientReq = {
      amount: parseInt(discounted ? total - discounted : total, 10),
      stripeId,
    }
    try {
     const clientSecretPromise = await fetch('https://api.hotel-prisma.ml/api/mock-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Nhớ body phải match Content-Type
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(clientReq),
        })
      const clientSecret = await clientSecretPromise.json()
    const cardElement = elements.getElement(CardElement)
    // Có thể trả từ data mutation nhưng config thêm loading
    const billingDetails = {
      // transactionHotelName: title,
      // transactionHotelManagerId: agentId,
      // transactionHotelType: propertyType,
      // transactionPrice: parseInt(discounted ? total - discounted : total, 10),
      name: `${billingFormRef.current.values.billingFirstName} ${billingFormRef.current.values.billingLastName}`,
      email: billingFormRef.current.values.billingEmail,
      // transactionAuthorContactNumber: billingFormRef.current.values.billingNumber,
      address:{
        city: billingFormRef.current.values.billingCompany || 'HCM',
        line1: billingFormRef.current.values.billingNote,
        postal_code: parseFloat(lat),
        state: address,
         }
    };
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    })
    if(paymentMethodReq.error) throw Error(paymentMethodReq.error.message)
    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret.client_secret, {
      payment_method: paymentMethodReq.paymentMethod && paymentMethodReq.paymentMethod.id,
    })
    // console.log(confirmedCardPayment)
    if(confirmedCardPayment.error) throw Error(confirmedCardPayment.error.message)
    await createTransaction({
      variables: {
        transaction: {
          transactionHotelName: title,
          transactionHotelManagerId: agentId,
          transactionHotelType: propertyType,
          transactionPrice: parseInt(discounted ? total - discounted : total, 10),
          transactionAuthorName: `${billingFormRef.current.values.billingFirstName} ${billingFormRef.current.values.billingLastName}`,
          transactionAuthorEmail: billingFormRef.current.values.billingEmail,
          transactionAuthorContactNumber: billingFormRef.current.values.billingNumber,
          transactionAuthorSpecial: billingFormRef.current.values.billingCompany,
          transactionAuthorNote: billingFormRef.current.values.billingNote,
          transactionLocationLat: parseFloat(lat),
          transactionLocationLng: parseFloat(lng),
          transactionRoom: parseInt(room ,10),
          transactionGuest: parseInt(guest, 10),
          transactionLocationFormattedAddress: address,
          transactionRange: parseInt(range, 10),
          transactionStripeId: confirmedCardPayment.paymentIntent.id,
          transactionStartDate: startDate,
          transactionEndDate: endDate,
        },
        hotelId: id,
        userId: authorId || undefined,
        coupon: couponUsed && {
          couponId: couponUsed.couponId,
          couponName: couponUsed.couponName,
          couponValue: parseInt(couponUsed.couponValue, 10),
          couponType: parseInt(couponUsed.couponType, 10),
          }|| undefined,
        },
      });
  }
    catch(e) {
      setLoadingButton(false)
      toast.error(e.message,
        {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
};
// console.log(stripeId)
  // const total = (parseInt(room, 10) * parseInt(guest, 10) * parseInt(range, 10)) * price;
  const discounted = couponUsed && (couponUsed.couponType === 1
    ? total * (couponUsed.couponValue / 100)
    : couponUsed.couponValue || null);
  return (
    <OrderTable className="isoOrderInfo">
      <div className="isoOrderTable">
        <div className="isoOrderTableHead">
          <span className="tableHead">Your Payment Information</span>
          <span className="tableHead">Total</span>
        </div>
        {/* <div className="isoOrderTableBody">
        <div className="isoSingleOrderInfo">
          <p>
            <span>{`Hotel Name: ${title}`}</span>
          </p>
        </div>
      </div> */}
        <div className="isoOrderTableFooter">
          <b>Hotel Name: </b>
          <span>{`${title}`}</span>
        </div>
        <div className="isoOrderTableFooter">
          <b>Price Per Night: </b>
          <span>{`$${price}.00/Night`}</span>
        </div>
        <div className="isoOrderTableFooter">
          <b>From Day:</b>
          <span>
            {startDate}
          </span>
        </div>
        <div className="isoOrderTableFooter">
          <b>To Day:</b>
          <span>
            {endDate}
          </span>
        </div>
        <div className="isoOrderTableFooter">
          <b>Room:</b>
          <span className="totalPrice">
            {room}
          </span>
        </div>
        <div className="isoOrderTableFooter">
          <b>Guest:</b>
          <span className="totalPrice">
            {guest}
          </span>
        </div>
        {couponUsed && (
        <div className="isoOrderTableFooter">
          <b>Coupon executed:</b>
          <span className="totalPrice">
            {couponUsed && couponUsed.couponName}
            <Tag color={couponUsed && couponUsed.couponType === 1 ? 'green' : 'geekblue'}>
              {couponUsed && couponUsed.couponType === 1 ? '% DISCOUNT' : 'NUMBER DISCOUNT'}
            </Tag>
          </span>
        </div>
        )}
        <div className="isoOrderTableFooter">
          <h1>Total:</h1>
          <span className="totalPrice">
            {`$${price}*${room}*${guest}*${range}`}
            <b>
              {discounted && (` - ${discounted}`)}
            </b>
            <h4
              style={{
                fontWeight: '800',
                textDecoration: discounted ? 'line-through' : 'none',
              }}
            >
              {`= $${total}.00/USD`}
            </h4>
            {discounted && (<h4 style={{ fontWeight: '800', color: 'red' }}>{`= $${Math.round(total - discounted)}.00/USD`}</h4>)}
          </span>
        </div>
        <CardElement options={CARD_ELEMENT_OPTIONS}/>
        <Button 
        disabled={disabled} 
        loading={loadingButton} 
        onClick={handlePlaceOrder} 
        type="primary" 
        className="isoOrderBtn">
          Place Order
        </Button>
      </div>
    </OrderTable>

  );
};
export default OrderInfo;
