/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { useState, useCallback } from 'react';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Button from 'components/UI/Antd/Button/Button';
import Modal from 'components/UI/Antd/Modal/Modal';
import {
  AntInput, AntTextArea, AntRange, AntCheckbox,
} from 'components/UI/Antd/AntdInputWithFormik';
import Box from 'components/UI/Box/Box';
import Heading from 'components/UI/Heading/Heading';
import HtmlLabel from 'components/UI/HtmlLabel/HtmlLabel';
import Text from 'components/UI/Text/Text';
import {
  GET_HOTEL_MANAGER_COUPONS,
} from 'apollo-graphql/query/query';
import {
  CREATE_COUPON,
} from 'apollo-graphql/mutation/mutation';
import { AgentContactWrapper } from './UserDetails.style';
import { dateFormat } from 'library/helpers/validators/fieldFormats';

const initialValues = {
  couponName: '',
  couponDescription: '',
  hotelsCoupon: '',
  couponDiscountPercent: '',
  couponDiscountNumber: '',
  couponQuantity: '',
  couponDateRangeApply: '',
  couponApplyAllCheckBoxes: false,
};

const Pie = dynamic(() => import('./Chart/Pie/Pie'));
const Radar = dynamic(() => import('./Chart/Radar/Radar'));
const required = (value) => (value ? undefined : 'Required');
const getMakeCouponFormValidation = () => Yup.object().shape({

  // couponDiscountPercent: Yup.number()
  //   .min(1, 'Please enter coupon percent larger than 1')
  //   .max(90, 'Please enter coupon percent less than 90'),
  couponDiscountPercent: Yup.number().when('couponDiscountNumber', {
    is: (coupon) => !coupon || coupon === '',
    then: Yup.number()
      .required('Discount on Number or Percent required')
      .min(1, 'Please enter coupon percent larger than 1')
      .max(90, 'Please enter coupon percent less than 90'),
    otherwise: Yup.number(),
  }),
  couponDiscountNumber: Yup.number().when('couponDiscountPercent', {
    is: (coupon) => !coupon || coupon === '',
    then: Yup.number()
      .required('Discount on Number or Percent required')
      .min(1, 'Please enter coupon number larger than 1'),
    otherwise: Yup.number(),
  }),
  couponApplyAllCheckBoxes: Yup.boolean().when('hotelsCoupon', {
    is: '',
    then: Yup.boolean()
      .required('Please check this box if you want to apply to all your Current Hotels')
      .oneOf([true], 'Please check this box if you want to apply to all your Current Hotels'),
    otherwise: Yup.boolean(),
  }),
  hotelsCoupon: Yup.string().when('couponApplyAllCheckBoxes', {
    is: false,
    then: Yup.string()
      .required('Write a hotel ID to this field separated by commas'),
    otherwise: Yup.string(),
  }),
  couponDateRangeApply: Yup.array().required('Date apply is required!'),
  couponQuantity: Yup.string().required('Coupon Quantity is Required!'),
}, [['couponDiscountPercent', 'couponDiscountNumber'], ['couponApplyAllCheckBoxes', 'hotelsCoupon']]);
const TransactionTable = dynamic(() => import('./Table/TransactionTable'));
const CouponTable = dynamic(() => import('./Table/CouponTable'));
const AgentBalance = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState(false);
  const [couponType, setCouponType] = useState(null);
  const [createCoupon] = useMutation(CREATE_COUPON, {
    onCompleted: () => {
      toast.success('Coupon has been created ', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    refetchQueries: () => [{
      query: GET_HOTEL_MANAGER_COUPONS,
    }],
  });
  // const handleOpenModal = useCallback(() => {
  //   setVisible(!visible);
  // }, [setVisible]);
  // const handleOpenModal = useCallback((event) => {
  //   setVisible(({ visible, ...prevState }) => ({ ...prevState, visible: !visible }));
  // }, [visible]);
  const calculateDaysLeft = (startDate, endDate) => {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);
    return endDate.diff(startDate, 'days');
  };
  async function handleCreateCoupon(formProps) {
    setVisible(!visible);
    const {
      couponName,
      couponDescription,
      hotelsCoupon,
      couponDiscountPercent,
      couponDiscountNumber,
      couponQuantity,
      couponDateRangeApply,
    } = formProps;
    const hotelsToApply = hotelsCoupon.split(/[ ,]+/);
    const formattedStartDate = moment(couponDateRangeApply[0]).format(dateFormat);
    const formattedEndDate = moment(couponDateRangeApply[1]).format(dateFormat);
    const dayRange = calculateDaysLeft(couponDateRangeApply[0], couponDateRangeApply[1]);
    try {
      await createCoupon({
        variables: {
          type: check ? 1 : 2,
          coupon: {
            couponName,
            couponDescription,
            couponType,
            couponValue: couponType === 1
              ? parseInt(couponDiscountPercent, 10) : parseInt(couponDiscountNumber, 10),
            couponQuantity: parseInt(couponQuantity, 10),
            couponStartDate: formattedStartDate,
            couponEndDate: formattedEndDate,
            couponRange: parseInt(dayRange, 10),
          },
          hotelsId: (!check && hotelsToApply) || undefined,
        },
      });
    } catch (e) {
      toast.error(e.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // finally {
    //   await createCoupon({

    //   });
    // }
  }

  return (
    <AgentContactWrapper>
      <Heading content="Your Balance" />
      <TransactionTable />
      <Heading content="Your Hotel' Coupons" />
      <Button onClick={() => { setVisible(true); }}>
        Create Coupon
      </Button>
      <Formik
        onSubmit={handleCreateCoupon}
        initialValues={initialValues}
        validationSchema={getMakeCouponFormValidation}
      >
        {(couponProps) => (
          <Modal
            className="coupon_modal"
            visible={visible}
            onOk={() => { setVisible(false); }}
            onCancel={() => { setVisible(false); }}
            closable
            footer={null}
          >
            <Form onSubmit={couponProps.handleSubmit}>
              <div className="coupon_name">
                <Field
                  component={AntInput}
                  name="couponName"
                  type="text"
                  validate={required}
                  placeholder="Write Coupon Name"
                  hasFeedback
                />
              </div>
              <Field
                component={AntTextArea}
                name="couponDescription"
                type="text"
                placeholder="Write Coupon Description"
                hasFeedback
              />
              <Field
                disabled={couponType && couponType === 2}
                component={AntInput}
                name="couponDiscountPercent"
                type="number"
                placeholder="Price discount - in Percent"
                hasFeedback
                suffix="%"
                setCouponType={setCouponType}
              />
              <Field
                disabled={couponType && couponType === 1}
                component={AntInput}
                name="couponDiscountNumber"
                type="number"
                placeholder="Price discount - in Number"
                hasFeedback
                setCouponType={setCouponType}
              />
              <Field
                component={AntInput}
                name="couponQuantity"
                type="number"
                placeholder="Coupon Quantity"
                hasFeedback
              />
              <Field
                component={AntRange}
                name="couponDateRangeApply" // DatePicker các kiểu không cần type để ko trigger onChange
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                placeholder="Date range for this coupon"
                hasFeedback
              />
              <Field
                disabled={!!check}
                component={AntTextArea}
                name="hotelsCoupon"
                type="text"
                placeholder="Enter Hotels Id that the coupon can be used, find Hotel Id at single page Hotel url '../../{id}', separate with commas"
                hasFeedback
              />
              <div style={{ display: 'flex' }}>
                <Field
                  component={AntCheckbox}
                  name="couponApplyAllCheckBoxes" // DatePicker các kiểu không cần type để ko trigger onChange
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  placeholder="Date range for this coupon"
                  hasFeedback
                  balanceCheckbox
                  setCheck={setCheck}
                  check={check}
                />
                <HtmlLabel
                  style={{ marginLeft: '10px', marginTop: '5px ' }}
                  htmlFor="couponApplyAllCheckBoxes"
                  content="Check this box to apply to all you Current Hotels"
                />
              </div>
              <Button htmlType="submit">
                Create Coupon
              </Button>
            </Form>
          </Modal>
        )}
      </Formik>
      <CouponTable />
      <Row gutter={30}>
        <Col md={12} xs={24}>
          <Box>
            <Heading content="Rating" />
            <Heading as="h5" content="Add(+) Random 1 to 5 for main data more beautiful" />
            <Pie user={user} />
          </Box>
        </Col>
        <Col md={12} xs={24}>
          <Box>
            <Heading content="Hotel Type" />
            <Heading as="h5" content="Add(+) Random 1 to 10 for main data more beautiful" />
            <Radar user={user} />
          </Box>
        </Col>
      </Row>
    </AgentContactWrapper>
  );
};

export default AgentBalance;
