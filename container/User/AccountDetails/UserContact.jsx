/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import Loader from 'components/Loader/Loader';
import ContactForm from 'components/ContactForm/ContactForm';
import {
  SEND_CONTACT,
} from 'apollo-graphql/mutation/mutation';
import { AgentContactWrapper, ContactDetails } from './UserDetails.style';

const initialValues = {
  subject: '',
  message: '',
  contact: '',
  cookieConsent: false,
};

const getContactFormValidation = () => Yup.object().shape({

  subject: Yup.string().required('Subject is required!'),
  message: Yup.string().required('Message is required!'),
  contact: Yup.string().required('Contact is required!'),
});

const AgentContact = (props) => {
  const [sendContact, { data }] = useMutation(SEND_CONTACT, {
    onCompleted: () => {
      toast.success('Submitted succesfully, we will contact you ASAP',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    },
  });
  const {
    loading,
  } = props;
  if (loading) return <Loader />;
  // const { agent_location, cellNumber, email } = processedData[0];

  async function handleSubmit(formProps) {
    const subject = formProps ? formProps.subject : '';
    const message = formProps ? formProps.message : '';
    const contact = formProps ? formProps.contact : '';
    const cookieConsent = formProps ? formProps.cookieConsent : false; // alert việc su dung cookie
    try {
      await sendContact({
        variables: {
          contact: {
            subject,
            message,
            cellNumber: contact,
          },
        },
      });
    } catch (e) {
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
    // alert(
    //   `Email : ${emailSubmit} \n Contact : ${contact}
    // \n Messege : ${message} \n Cookie Consent : ${cookieConsent}`,
    // );
  }

  return (
    <AgentContactWrapper>
      <Heading content="Send Messege To Admin" />
      <Row gutter={30}>
        <Col lg={16}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={getContactFormValidation}
          >
            {ContactForm}
          </Formik>
        </Col>
        <Col lg={8}>
          <ContactDetails>
            <Heading as="h1" content="Contact Admin" />
            <Heading as="h3" content="Phone No" />
            <Text content="0xxx000xxx00x" />
            <Heading as="h3" content="Email" />
            <Text content="redias2048@gmail.com" />
            <Heading as="h3" content="Address" />
            <Text content="Road ABC District DEF Ward GHI City XYZ" />
          </ContactDetails>
        </Col>
      </Row>
    </AgentContactWrapper>
  );
};

export default AgentContact;
