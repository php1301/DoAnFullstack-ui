import React, { useContext } from 'react';
import { Formik } from 'formik';
import Router from 'next/router';
import RenderSignInForm from 'components/SignIn/RenderSignInForm';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthProvider';
import { FORGET_PASSWORD_PAGE } from 'settings/constants';

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

export default () => {
  const { signIn, loggedIn } = useContext(AuthContext);
  if (loggedIn) Router.push('/');
  const handleSubmit = (formProps) => {
    signIn(formProps);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    //  tất cả các props của formik
      render={(props) => (
        <RenderSignInForm
          {...props}
          forgetPasswordLink={FORGET_PASSWORD_PAGE}
        />
      )}
      validationSchema={getLoginValidationSchema}
    />
  );
};
