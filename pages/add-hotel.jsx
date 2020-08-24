import { useState } from 'react';
import { useMutation } from 'react-apollo';
import { toast, ToastContainer } from 'react-toastify';
import Router from 'next/router';
import { Field } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import FormStepper from 'components/UI/Steppers/FormStepper';
import { AntInput, AntTextArea } from 'components/UI/Antd/AntdInputWithFormik';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';


import {
  WifiAvailability,
  Parking,
  Pool,
  AirCondition,
  ExtraBed,
  IsNegotiable,
  PropertyType,
} from 'components/AddHotel/RenderAmenitiesForm';

import { PhotoUploadComponent } from 'components/AddHotel/RenderUploadPhotosForm';
import { FormMapComponent } from 'components/AddHotel/RenderLocationInputForm';
import { CREATE_HOTEL } from 'apollo-graphql/mutation/mutation';
import StepperWrapper, {
  UploaderWrapper,
  LocationWrapper,
  AmenitiesWrapper,
  HeaderSection,
  Title,
  Description,
  Label,
} from 'components/AddHotel/AddHotel.style';
import { secretPage } from 'library/helpers/restriction';

// Fake loader với tham số setTimeOut
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const required = (value) => (value ? undefined : 'Required');
const getAddHotelValidationSchema = () => Yup.object().shape({
  pricePerNight: Yup.number()
    .min(1, 'Please enter Price that greater than 0')
    .max(1000, 'Please enter Price that less than 1000'),
});
const formValue = {
  hotelName: '',
  pricePerNight: '',
  hotelDetails: '',
  guest: 0,
  rooms: 0,
  price: 0,
  hotelPhotos: [],
  location: [],
  locationDescription: '',
  propertyType: '',
  contactNumber: null,
  isNegotiable: '',
  wifiAvailability: '',
  airCondition: '',
  parking: '',
  poolAvailability: '',
  extraBed: '',
};

const QuantityInput = ({ field, form }) => {
  const [state, setState] = useState(field ? field.value : 0);

  const handleIncrement = () => {
    let currentValue = state;
    // ++prefix tăng giá trị currentValue rồi setState
    setState(++currentValue);
    // setFieldValue của form(Field của Formik) (field cần set, value)
    form.setFieldValue(field.name, ++currentValue);
  };
  const handleDecrement = () => {
    let currentValue = state;
    if (currentValue <= 0) return false;
    setState(--currentValue);
    form.setFieldValue(field.name, --currentValue);
    return true;
  };

  const handleOnChange = (e) => {
    setState(e.target.value);
    form.setFieldValue(field.name, e.target.value);
  };

  return (
    <InputIncDec
      value={state}
      name={field && field.name}
      onChange={handleOnChange}
      increment={handleIncrement}
      decrement={handleDecrement}
    />
  );
};

// Xử lý stepper, ở step 2 truyền các component con tương ứng
const RenderCreateOrUpdateForm = ({ fieldLabel, radioBoxLabel }) => {
  const [createHotel, { loading, error }] = useMutation(CREATE_HOTEL, {
    ignoreResults: false,
    onCompleted: (data) => {
      const query = {
        slug: data.createHotel.slug,
        id: data.createHotel.id,
      };
      toast.success('Your hotel is created, you will be redirected shortly', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      Router.push(`/post/[...slug]`,`/post/${query.slug}/${query.id}`)
    },
  });
  return (
    <StepperWrapper className="hotel-submission-form">
      <FormStepper
    // Làm các ô input formStepper blank bằng initialValues
        initialValues={formValue}
        validationSchema={getAddHotelValidationSchema}
        onSubmit={(values, actions) => {
          // Nên tách nếu log ra thấy data ko giống với input bên BE
          // BE nhận 1 mảng url
          const dataUrl = [];
          values.hotelPhotos.map((i) => dataUrl.push({ url: i.url }));
          createHotel({
            variables: {
              addHotelInput: {
                hotelName: values.hotelName,
                pricePerNight: parseInt(values.pricePerNight, 10),
                hotelDetails: values.hotelDetails,
                guest: values.guest,
                rooms: values.rooms,
                price: parseInt(values.price, 10),
                propertyType: values.propertyType,
                // hotelPhotos: values.hotelPhotos,
                // location: values.location,
                locationDescription: values.locationDescription,
                contactNumber: values.contactNumber,
                isNegotiable: values.isNegotiable === 'yes',
                wifiAvailability: values.wifiAvailability === 'free',
                airCondition: values.airCondition === 'yes',
                parking: values.parking === 'yes',
                poolAvailability: values.poolAvailability === 'yes',
                extraBed: values.extraBed === 'yes',
              },
              image: dataUrl,
              location: {
                lat: values.location[0].lat,
                lng: values.location[0].lng,
                formattedAddress: values.location[0].formattedAddress,
                zipcode: values.location[0].zipcode,
                city: values.location[0].city,
                state_long: values.location[0].state_long,
                state_short: values.location[0].state_short,
                country_long: values.location[0].country_long,
                country_short: values.location[0].country_short,
              },
            },
          });
          if (error) return `Error ${error}`;
          // console.log(dataUrl);
          // console.log(values);
          // const query = {}
          // Router.push({
          //   pathname:'post'
          // })
        }}
      >
        <FormStepper.Page>
          <ToastContainer />
          <HeaderSection>
            <Title>Step 1: Start with the basics</Title>
          </HeaderSection>

          <Row gutter={[30, 30]}>
            <Col sm={12}>
              <Field
                component={AntInput}
                name="hotelName"
                type="text"
                label="Hotel Name"
                validate={required}
                placeholder="Write your hotel name here"
                hasFeedback
              />
            </Col>
            <Col xs={12}>
              <Field
                component={AntInput}
                name="pricePerNight"
                type="number"
                label="Price Per Night (USD)"
                validate={required}
                placeholder="$00"
                hasFeedback
              />
            </Col>
            <Col xs={12}>
              <Text
                as="h3"
                {...radioBoxLabel}
                content="Hotel Property Type"
              />
              <Field
                component={PropertyType}
                name="propertyType"
                validate={required}
                hasFeedback
              />
            </Col>
            <Col sm={12}>
              <Text
                as="h3"
                {...radioBoxLabel}
                content="Allow Negotiating?"
              />
              <Field
                name="isNegotiable"
                component={IsNegotiable}
                placeholder="Allow Negotiating"
              />
            </Col>
          </Row>

          <Field
            component={AntTextArea}
            name="hotelDetails"
            type="text"
            label="Hotel Description"
            validate={required}
            placeholder="Tell people about your hotel: your room, location, amenities?"
            hasFeedback
            rows={4}
          />
          <Heading
            as="h3"
            {...fieldLabel}
            content="How Many guests can your Hotel accommodate?"
          />
          <Field
            component={QuantityInput}
            name="guest"
            label="Guest Input"
            hasFeedback
            rows={4}
          />
          <Heading
            {...fieldLabel}
            as="h3"
            content="How Many Rooms Available?"
          />
          <Field
            component={QuantityInput}
            name="rooms"
            label="Rooms Input"
            hasFeedback
            rows={4}
          />
        </FormStepper.Page>

        <FormStepper.Page>
          <HeaderSection>
            <Title>Step 2: Hotel Photos</Title>
          </HeaderSection>

          <UploaderWrapper>
            <Label> Do You have photos to share? (Optional)</Label>
            <Label>Để hạn chế bandwidth của AWS bị exceeded nên chỉ cho upload mock data</Label>
            <Label>Xóa 1 tấm ảnh ở dưới mock để upload(Test upload ảnh AWS trong Profile)</Label>
            <Field
              component={PhotoUploadComponent}
              name="hotelPhotos"
              type="file"
              label="Hotel Photos"
              validate={required}
              hasFeedback
              rows={4}
            />
          </UploaderWrapper>
        </FormStepper.Page>

        <FormStepper.Page>
          <HeaderSection>
            <Title>Step 3: Hotel Location</Title>
          </HeaderSection>

          <LocationWrapper>
            <Row gutter={30}>
              <Col sm={12}>
                <Field
                  component={AntInput}
                  name="contactNumber"
                  type="number"
                  label="Contact Number"
                  placeholder="Phone"
                  hasFeedback
                />
              </Col>
            </Row>

            <Field
              component={AntTextArea}
              name="locationDescription"
              type="textarea"
              label="Details description for Hotel Component"
              placeholder="Write your hotel direction in details , it may help traveler to find your hotel easily"
              hasFeedback
              rows={4}
            />
            <Field
              component={FormMapComponent}
              type="text"
              name="location"
              label="Choose Location"
              hasFeedback
            />
          </LocationWrapper>
        </FormStepper.Page>

        <FormStepper.Page>
          <AmenitiesWrapper>
            <HeaderSection>
              <Title>
                Step 4: Hotel Amenities
                {' '}
                <span> (optional)</span>
              </Title>
              <Description>
                Add your hotel amenities , it can help travelers to choose their
                perfect hotel. Thanks.
              </Description>
            </HeaderSection>
            <Row gutter={30}>
              <Col md={8}>
                <Text as="h3" {...fieldLabel} content="Wifi Availability" />
                <Field
                  name="wifiAvailability"
                  component={WifiAvailability}
                  placeholder="Wifi Availability"
                />
              </Col>

              <Col md={8}>
                <Text as="h3" {...fieldLabel} content="Parking Availability" />
                <Field
                  name="parking"
                  component={Parking}
                  placeholder="Parking Availability"
                />
              </Col>

              <Col md={8}>
                <Text as="h3" {...fieldLabel} content="Pool Availability" />
                <Field
                  name="poolAvailability"
                  component={Pool}
                  placeholder="Pool Availability"
                />
              </Col>

              <Col md={8}>
                <Text as="h3" {...fieldLabel} content="Air-Conditioner" />
                <Field
                  name="airCondition"
                  component={AirCondition}
                  placeholder="Air-Conditioner"
                />
              </Col>

              <Col md={8}>
                <Text
                  as="h3"
                  {...fieldLabel}
                  content="Extra Bed Availability"
                />
                <Field
                  name="extraBed"
                  component={ExtraBed}
                  placeholder="Extra Bed Availability"
                />
              </Col>
            </Row>
          </AmenitiesWrapper>
        </FormStepper.Page>
      </FormStepper>
    </StepperWrapper>
  );
};


RenderCreateOrUpdateForm.defaultProps = {
  fieldLabel: {
    color: '#2C2C2C',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: '700',
    mt: ['30px', '47px'],
    mb: ['15px', '30px'],
  },
  radioBoxLabel: {
    color: '#2C2C2C',
    fontSize: '15px',
    lineHeight: '18px',
    fontWeight: '700',
    // mt: ['30px', '47px'],
    mb: ['15px', '30px'],
  },
};

RenderCreateOrUpdateForm.getInitialProps = async (context) => {
  const { query } = context;
  const isLoggedIn = secretPage(context);
  return {
    isLoggedIn, query,
  };
};
export default RenderCreateOrUpdateForm;
