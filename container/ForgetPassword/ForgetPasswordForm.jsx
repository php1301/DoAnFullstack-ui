import React from 'react';
import { Formik } from 'formik';
import RenderForgetPasswordForm from 'components/ForgetPassword/RenderForgetPassswordForm';
import * as Yup from 'yup';


const initialValues = {
  email: '',
};

const getPasswordFormValidationSchema = () => Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required(',Must enter Email'),
});

const handleSubmit = (formProps) => {
  const { email } = formProps;
  alert(`Client email is ${email}`);
};

export default () => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    validationSchema={getPasswordFormValidationSchema}
    render={RenderForgetPasswordForm}
  />
);
