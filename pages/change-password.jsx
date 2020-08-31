import React from 'react';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Head from 'next/head';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AntInput } from 'components/UI/Antd/AntdInputWithFormik';
import Row from 'components/UI/Antd/Grid/Row';
import Col from 'components/UI/Antd/Grid/Col';
import Button from 'components/UI/Antd/Button/Button';
import { getIsLoggedIn, withChangePasswordSecret } from 'library/helpers/restriction';
import redirect from 'library/helpers/redirect';
import {
  CHANGE_PASSWORD_FROM_FORGET_PASSWORD,
} from 'apollo-graphql/mutation/mutation';
import { FormTitle } from 'container/User/AccountSettings/UserAccountSettings.style';

export default function ChangePassWord({ query }) {
  const [changePassWordFromForgetPassword] = useMutation(CHANGE_PASSWORD_FROM_FORGET_PASSWORD);
  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const getChangePassWordValidationSchema = () => Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password has to be longer than 6 characters!')
      .max(20, 'Too Long!')
      .required('New Password is required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords are not the same!')
      .required('Password confirmation is required'),
  });

  async function handleSubmit(formProps) {
    const { confirmPassword } = formProps;
    try {
      await changePassWordFromForgetPassword({
        variables: {
          password: confirmPassword,
          email: query.e,
        },
      });
      toast.success('Password Updated! 🦄 Redirect to login page ', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        Router.replace('/login');
      }, 6000);
    } catch (e) {
      toast.error(e.message.slice(15), {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <Head><title>Reset Password</title></Head>
      <FormTitle>Change Password</FormTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={getChangePassWordValidationSchema}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Row gutter={30}>
              <Col lg={24}>
                <Field
                  component={AntInput}
                  name="newPassword"
                  type="password"
                  size="large"
                  label="Enter new password"
                  value={props.values.newPassword}
                  hasFeedback
                />
              </Col>
              <Col lg={24}>
                <Field
                  component={AntInput}
                  name="confirmPassword"
                  type="password"
                  size="large"
                  label="Confirm new password"
                  value={props.values.confirmPassword}
                  hasFeedback
                />
              </Col>
            </Row>
            <div className="submit-container">
              <Button className="signin-btn" type="primary" htmlType="submit">
                Reset Password
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export async function getServerSideProps({ query, ...context }) {
  const isLoggedIn = getIsLoggedIn(context);
  const secret = withChangePasswordSecret(context);
  if (isLoggedIn === true) redirect(context, '/profile');
  if (query.code !== secret) redirect(context, '/error');
  return {
    props: { query },
  };
}
