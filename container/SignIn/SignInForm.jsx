/* eslint-disable no-unused-expressions */
import React, { useContext } from 'react';
import { Formik } from 'formik';
import Router from 'next/router';
import RenderSignInForm from 'components/SignIn/RenderSignInForm';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthProvider';
import { FORGET_PASSWORD_PAGE } from 'settings/constants';

const SignInForm = ({ prev }) => {
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const getLoginValidationSchema = () => Yup.object().shape({
    email: Yup.string()
      .email('Invalid Email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password is too short')
      .max(20, 'Password is too long')
      .required('Password is required!'),
  });

  const { signIn, loggedIn } = useContext(AuthContext);
  if (loggedIn) {
    prev ? Router.push(prev) : Router.push('/');
  }
  const handleSubmit = (formProps) => {
    signIn(formProps);
  };
  return (
    //  tất cả các props của formik
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={getLoginValidationSchema}
    >
      {(props) => (
        <RenderSignInForm
          {...props}
          forgetPasswordLink={FORGET_PASSWORD_PAGE}
        />
      )}
    </Formik>
  );
};
export default SignInForm;
